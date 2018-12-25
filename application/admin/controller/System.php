<?php
namespace app\admin\controller;
use think\Controller;
use think\Db;

class System extends Controller
{
    public function index()
    {
        return view();
    }

    /**
    *	管理员列表
    */
    public function admin_user()
    {
    	return view();
    }

    /**
    *   系统设置
    */
    public function setting()
    {
        return view();
    }

    /**
    *   菜单管理
    */
    public function menu()
    {
        $menus = Db::name('admin_menu')->field('id,name,display,sort,pid')->order(['sort'=>'desc','id'=>'asc'])->select();
        $i=1;
        $arr = [];
        foreach ($menus as $v) {
            $arr[$i]['id'] = $v['id'];
            $arr[$i]['name'] = $v['name'];
            $arr[$i]['parentid'] = $v['pid'];
            $arr[$i]['display'] = $v['display'];
            $arr[$i]['sort'] = $v['sort'];
            $i++;
        }
        $tree = new \app\admin\classes\tree;
        $tree->tree($arr);
        $menus_tree = $tree->getArray()?:[];
        $this->assign('menus',$menus_tree);
        return $this->fetch();
    }

    /**
    *   菜单添加
    */
    public function menu_add($id=0)
    {
        if(request()->isPost()){
            $pdata = $this->request->post();

            //-------------验证-------------
            $validate = new \app\admin\validate\Menu;
            if (!$validate->check($pdata)) {
                $this->error($validate->getError());
            }

            //-------------数据库-------------
            //查询是否存在
            if (Db::name('admin_menu')->where('pid',$pdata['pid'])->where('name',$pdata['name'])->find()) {
                $this->error("同级菜单中已存在此菜单名！");
            }
            //写入数据库
            if(!Db::name('admin_menu')->insert($pdata)){
                $this->error("修改失败！");
            }

            $this->success('添加成功！', 'menu');
        }else{
            $menus = Db::name('admin_menu')->field('id,name,pid')->where('display',1)->select();
            $menu = ['display'=>1,'sys'=>1,'jian'=>1,'target'=>0];//变量声明
            $i=1;
            $arr = [];
            foreach ($menus as $v) {
                $arr[$i]['id'] = $v['id'];
                $arr[$i]['name'] = $v['name'];
                $arr[$i]['parentid'] = $v['pid'];
                $i++;
            }
            $tree = new \app\admin\classes\tree;
            $tree->tree($arr);
            $menus_tree = $tree->getArray()?:[];
            $this->assign('menus',$menus_tree);
            $this->assign('menu',$menu);
            $this->assign('pid', $id);
            return $this->fetch();
        }
    }
    

    /**
    *   菜单修改
    */
    public function menu_edit($id=0)
    {
        if(!$menu = Db::name('admin_menu')->where('id', $id)->find()) return($this->error("菜单不存在！"));
        if(request()->isPost()){
            $pdata = $this->request->post();

            //-------------验证-------------
            $validate = new \app\admin\validate\Menu;
            if (!$validate->check($pdata)) {
                $this->error($validate->getError());
            }

            //-------------数据库-------------
            //修改数据库
            if(!Db::name('admin_menu')->where('id', $id)->update($pdata)){
                $this->error("修改失败！");
            }

            $this->success('修改成功！', 'menu');
        }else{
            $menus = Db::name('admin_menu')->field('id,name')->select();
            $this->assign('menus',$menus);
            $this->assign('menu',$menu);
            $this->assign('pid', $menu['pid']);
            return $this->fetch('menu_add');
        }
    }
    

    /**
    *   菜单删除
    */
    public function menu_del($id=0)
    {
        if(!Db::name('admin_menu')->field('id')->where('id', $id)->find()) return($this->error("菜单不存在！"));
        if(Db::name('admin_menu')->field('id')->where('pid', $id)->find()) return($this->error("请先删除子菜单！"));
        if (Db::name('admin_menu')->where('id', $id)->delete()) {
            return($this->success("删除成功！", 'menu'));
        } else {
            return($this->error("删除失败！"));
        }
    }
    

    /**
    *   菜单排序
    */
    public function menu_sort($id=0)
    {
        if(request()->isPost()){
            $pdata = $this->request->post();
            foreach ($pdata['sort'] as $k => $v) {
                Db::name('admin_menu')->update(['id'=>$k, 'sort'=>$v]);
            }
            $this->success('排序成功！', 'menu');
        }else{
            $this->error("提交数据错误！");
        }
    }

}

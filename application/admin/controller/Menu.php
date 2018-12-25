<?php
namespace app\admin\controller;
use app\admin\controller\Admin;
use app\admin\model\AdminMenu as mModel;

class Menu extends Admin
{
    /**
    *   菜单管理
    */
    public function index()
    {
        $menus = mModel::field('id,name,display,sort,pid')->order(['sort'=>'desc','id'=>'asc'])->select();
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
        $tree = new \app\admin\classes\Tree;
        $tree->tree($arr);
        $menus_tree = $tree->getArray()?:[];
        $this->assign('menus',$menus_tree);
        $this->assign('ptitle','菜单管理');
        return $this->fetch();
    }

    /**
    *   菜单添加
    */
    public function add($id=0)
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
            if (mModel::where('pid',$pdata['pid'])->where('name',$pdata['name'])->find()) {
                $this->error("同级菜单中已存在此菜单名！");
            }
            //写入数据库
            if(!mModel::insert($pdata)){
                $this->error("修改失败！");
            }

            $this->success('添加成功！', 'admin/menu/');
        }else{
            $menus = mModel::field('id,name,pid')->where('display',1)->select();
            $menu = ['display'=>1,'sys'=>1,'jian'=>1,'target'=>0];//变量声明
            $i=1;
            $arr = [];
            foreach ($menus as $v) {
                $arr[$i]['id'] = $v['id'];
                $arr[$i]['name'] = $v['name'];
                $arr[$i]['parentid'] = $v['pid'];
                $i++;
            }
            $tree = new \app\admin\classes\Tree;
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
    public function edit($id=0)
    {
        if(!$menu = mModel::where('id', $id)->find()) return($this->error("菜单不存在！"));
        if(request()->isPost()){
            $pdata = $this->request->post();

            //-------------验证-------------
            $validate = new \app\admin\validate\Menu;
            if (!$validate->check($pdata)) {
                $this->error($validate->getError());
            }

            //-------------数据库-------------
            //修改数据库
            mModel::where('id', $id)->Update($pdata);
            $this->success('修改成功！', 'admin/menu/');
        }else{
            $menus = mModel::field('id,name')->select();
            $this->assign('menus',$menus);
            $this->assign('menu',$menu);
            $this->assign('pid', $menu['pid']);
            return $this->fetch('add');
        }
    }
    

    /**
    *   菜单删除
    */
    public function del($id=0)
    {
        if(!mModel::field('id')->where('id', $id)->find()) return($this->error("菜单不存在！"));
        if(mModel::field('id')->where('pid', $id)->find()) return($this->error("请先删除子菜单！"));
        if (mModel::where('id', $id)->delete()) {
            return($this->success("删除成功！", 'admin/menu/'));
        } else {
            return($this->error("删除失败！"));
        }
    }
    

    /**
    *   菜单排序
    */
    public function sort($id=0)
    {
        if(request()->isPost()){
            $pdata = $this->request->post();
            foreach ($pdata['sort'] as $k => $v) {
                mModel::Update(['id'=>$k, 'sort'=>$v]);
            }
            $this->success('排序成功！', 'admin/menu/');
        }else{
            $this->error("提交数据错误！");
        }
    }

}

<?php
namespace app\admin\controller;
use think\Controller;
use app\admin\model\AdminMenu as MenuModel;

class Admin extends Controller
{
    protected function initialize()
    {
        $m = request()->controller();
        $a = request()->action();
        $menus = MenuModel::field('id,name,display,sort,pid,icon,url')->order(['sort'=>'desc','id'=>'asc'])->select();
        $i=1;
        $arr = [];
        foreach ($menus as $v) {
            $arr[$i]['id'] = $v['id'];
            $arr[$i]['name'] = $v['name'];
            $arr[$i]['parentid'] = $v['pid'];
            $arr[$i]['display'] = $v['display'];
            $arr[$i]['sort'] = $v['sort'];
            $arr[$i]['url'] = $v['url'];
            $arr[$i]['icon'] = $v['icon'];
            $i++;
        }
        $leftmenus = MenuModel::getMainMenus();
        // var_dump($leftmenus);
        // var_dump(MenuModel::all(1,true));
        $this->assign('_menus_left',$leftmenus);
        $this->assign('_menus_btn',config('app.menu.menu'));

        var_dump(MenuModel::getInfo());
    }
}

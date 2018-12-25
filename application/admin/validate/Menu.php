<?php

namespace app\admin\validate;

use think\Validate;

class Menu extends Validate
{
	protected $rule=[
        'name|菜单名称'=>'require',
        'url|菜单链接'=>'require',
        'icon|菜单图标'=>'require',
    ];
    
    protected $message = [];
}

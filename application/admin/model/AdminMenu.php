<?php
namespace app\admin\model;
use think\Model;

class AdminMenu extends Model
{
    /**
     * 获取后台主菜单(一级 > 二级 > 三级)
     * 后台左侧使用
     * @param int $pid 父ID
     * @param int $level 层级数
     * @return array
     */
    public static function getMainMenus($update = false, $pid = 0, $level = 0, $data = [])
    {
        $cache_tag = '_admin_menu';
        $trees = [];
        if (config('app_debug') == false && $level == 0 && $update == false) {
            $trees = cache($cache_tag);
        }
        if (empty($trees) || $update === true) {
            if (empty($data)) {
                $data = self::order(['sort'=>'desc','id'=>'asc'])->column('id,name,display,sort,pid,icon,url');
                $data = array_values($data); 
            }

            foreach ($data as $k => $v) {
                if ($v['pid'] == $pid) {
                    if ($level == 3) {
                        return $trees;
                    }
                    // 过滤没访问权限的节点
                    // if (!RoleModel::checkAuth($v['id'])) {
                    //     unset($data[$k]);
                    //     continue;
                    // }
                    // // 多语言支持
                    // if (config('sys.multi_language') == 1) {
                    //     $title = Db::name('admin_menu_lang')->where(['menu_id' => $v['id'], 'lang' => dblang('admin')])->value('title');
                    //     if ($title) {
                    //         $v['title'] = $title;
                    //     }
                    // }
                    unset($data[$k]);
					$v['url'] = url($v['url']);
                    $v['sons'] = self::getMainMenus($update, $v['id'], $level+1, $data);
                    $trees[] = $v;
                }
            }
            // 非开发模式，缓存菜单
            if (config('app_debug') == false) {
                cache($cache_tag, $trees);
            }
        }

        return $trees;
    }

    /**
     * 获取当前访问节点信息，支持扩展参数筛查
     * @param string $id 节点ID
     * @author 橘子俊 <364666827@qq.com>
     * @return array
     */
    public static function getInfo($id = 0)
    {
        $map = [];
        if (empty($id)) {
            $model      = request()->module();
            $controller = request()->controller();
            $action     = request()->action();
            $map['url'] = $model.'/'.$controller.'/'.$action;
        } else {
            $map['id'] = (int)$id;
        }
        $map['display'] = 1;
        $rows = self::where($map)->column('id,name,url,data');

        if (!$rows) {
            return false;
        }
        sort($rows);
        if (count($rows) > 1) {
            $_get = input('param.');
            var_dump($_get);
            if (!$_get) {
                foreach ($rows as $k => $v) {
                    if ($v['param'] == '') {
                        return $rows[$k];
                    }
                }
            }
            foreach ($rows as $k => $v) {
                if ($v['param']) {
                    parse_str($v['param'], $param);
                    ksort($param);
                    $param_arr = [];
                    foreach ($param as $kk => $vv) {
                        if (isset($_get[$kk])) {
                            $param_arr[$kk] = $_get[$kk];
                        }
                    }
                    $sqlmap = [];
                    $sqlmap['param'] = http_build_query($param_arr);
                    $sqlmap['url'] =  $map['url'];
                    $res = self::where($sqlmap)->field('id,name,url,data')->find();
                    if ($res) {
                        return $res;
                    }
                }
            }
            $map['param'] = '';
            $res = self::where($map)->field('id,name,url,data')->find();
            if ($res) {
                return $res;
            } else {
                return false;
            }
        }
        return $rows[0];
    }
}

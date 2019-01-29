const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;

/**
 * API :GET/admin/category/delete?cid
 * 含义：客户端获取的菜品类别，按编号升序排列
 * 返回值形如：
 *  [{cid:1,cname:'..'},{..}]
 */
router.get('/', (req, res) => {
    pool.query('SELECT * FROM xfn_category ORDER BY cid', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
/**
 * API ：DELETE/admin/category/:cid
 * 含义:根据表示菜品编号的路由参数，删除该菜品
 * 返回值形如：
 *  {code:200,msg:'1 category deleted'}
 *  {code:400,msg:'0 category deleted'}
 */
router.delete('/:cid', (req, res) => {
    //注意删除菜品类别之前必须先把属于该类别的菜品的类别编号设置为NULL
    pool.query('UPDATE xfn_dish SET categoryId=NULL WHERE categoryId=?', req.params.cid, (err, result) => {
        if (err) throw err;
        //至此制定类别的菜品已经修改完毕
        pool.query('DELETE FROM xfn_category WHERE cid=?', req.params.cid, (err, result) => {
            if (err) throw err;
            //获取delete 语句在数据库中影响的行数
            if (result.affectedRows > 0) {
                res.send({ code: 200, msg: '1 category deleted' })
            } else {
                res.send({ code: 400, msg: '0 category deleted' })
            }
        });
    });
});
//添加  post
router.post('/', (req, res) => {
    // console.log("获取到请求数据");
    // console.log(req.body);
    var data = req.body;//形如{cname:'...'}
    //insert / update 可简写
    pool.query('INSERT INTO xfn_category SET ?', data, (err, result) => {
        if (err) throw err;
        res.send({ code: 200, msg: '1 category added' });
    });
});


/**
 * pedding 没有执行到res.send
 * 没有给响应
 */

//修改 put
router.put('/', (req, res) => {
    var data = req.body;//请求数据{cid:xx,cname:'xxx'}
    //TODO 此处可对数据进行验证
    pool.query('UPDATE xfn_category SET ? WHERE cid=?', [data, data.cid], (err, result) => {
        if (err) throw err;
        if (result.changedRows > 0) {
            //至少实际更新了一行
            res.send({ code: 200, msg: '1 category modified 修改成功' });
        } else if (result.affectedRows == 0) {
            res.send({ code: 400, msg: 'category not exits 类别不存在' });
        } else if (result.affectedRows == 1 && result.changedRows == 0) {
            //新值旧值一样
            res.send({ code: 401, msg: 'no category modified 影响1行，但没改' });
        }
    });
})



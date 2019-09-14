 //组装数据1
 function pakage(id, box) {
     // 去重
     var hash = {};
     let arr = box.reduce(function(item, next) {
             hash[next.id] ? '' : hash[next.id] = true && item.push(next);
             return item
         }, [])
         // 去重
     let html = '<option value=0>0</option>';
     for (let i = 0; i < arr.length; i++) {
         html += `<option value='` + arr[i].id + `'>` + arr[i].id + `</option>`;
     }
     id.innerHTML = html
     renderForm()
 }

 function unique(arr) {
     const res = new Map();
     return arr.filter((a) => !res.has(a.parent_id) && res.set(a, 1))
 }

 //组装数据2
 function pakage1(id, box) {
     let html = '';
     for (let i = 0; i < box.length; i++) {
         html += `<input type="checkbox" title="` + box[i].category + `" name="` + box[i].category + `">`;
     }
     id.innerHTML = html
     renderForm()
 }
 //组装数据3
 function pakage3(id, box) {
     let html = '';
     for (let i = 0; i < box.length; i++) {
         html += `<option value='` + box[i].id + `'>` + box[i].title + `</option>`;
     }
     id.innerHTML = html
     renderForm()
 }
 //组装数据4
 function pakage4(id, box) {
     let html = '';
     for (let i = 0; i < box.length; i++) {
         html += `<input type="checkbox" title="` + box[i].plugin_name + `" name="` + box[i].plugin_name + `">`;
     }
     id.innerHTML = html
     renderForm()
 }

 //组装数据4
 function pakage5(id, box) {
     let html = '';
     for (let i = 0; i < box.length; i++) {
         html += `<option value='` + box[i].client_ip + `'>` + box[i].client_ip + `</option>`;
     }
     id.innerHTML = html
     renderForm()
 }



 //重新渲染
 function renderForm() {
     layui.use('form', function() {
         var form = layui.form; //高版本建议把括号去掉，有的低版本，需要加()
         form.render();
     });
 }


 //封装ajax
 function myAjax(id, url, callback) {
     $.ajax({
         url,
         type: 'get',
         contentType: 'application/json',
         beforeSend: function(xhr) {
             xhr.setRequestHeader('Token', Token)
         },
         crossDomain: true,
         success: function(data) {
             if (data.status == 200) {
                 callback(id, data.result.list)
             }
         },
         error: function(err) {
             console.log(JSON.stringify(err))
         }

     });
 }

 function openIframe(title, iframe, number, name, isFull) {
     var index = layer.open({
         type: 2,
         area: ['100%', '100%'],
         fix: false, //不固定
         maxmin: true,
         shadeClose: true,
         shade: 0.4,
         title: title,
         content: iframe,
         success: function(layero, index) {
             var iframe = window['layui-layer-iframe' + index];
             // 向子页面的全局函数child传参
             iframe.child(number, name);
         },
     });
     if (isFull) {
         layer.full(index);
     }
 }

 function htmlAjax(type, url, callback) {
     $.ajax({
         type: type,
         dataType: 'json',
         url: url,
         contentType: "application/json;charset=utf-8",
         beforeSend: function(xhr) {
             xhr.setRequestHeader('Token', Token);
         },
         crossDomain: true,
         success: function(data) {
             if (data.status == 200) {
                 if (callback != undefined) {
                     callback(data);
                 }

             }
         },
         error: function(err) {
             callback(err);

         }
     })
 }

 function handler(value) {
     if (value == 1) {
         return '新闻'
     } else if (value == 2) {
         return '小说'
     } else if (value == 3) {
         return '食品企业'
     } else if (value == 4) {
         return '机械企业'
     } else if (value == 5) {
         return '娱乐八卦'
     } else {
         return '未定义'
     }
 }

 //查找对象数组
 function search(nameKey, myArray) {
     for (var i = 0; i < myArray.length; i++) {
         if (myArray[i].title === nameKey) {
             return myArray[i].id;
         }
     }
 }

 //处理type
 function gettype(data) {
     let str = '';
     for (let i = 0; i < data.result.list.length; i++) {
         if (data.result.list[i].id == 17) {
             str = data.result.list[i].sys_value.substring(1, data.result.list[i].sys_value.length - 1)
         }
     };
     var reg = new RegExp('"', "g");
     newstr = str.replace(reg, "")
     let alltype = newstr.split(',');
     let alltype2 = []


     for (let i = 0; i < alltype.length; i++) {
         alltype2.push(alltype[i].split(':'))
     }
     let finalarr = [];
     for (let i = 0; i < alltype2.length; i++) {
         finalarr.push({
             'title': alltype2[i][0],
             'id': parseInt(alltype2[i][1])
         })
     }
     return finalarr;
 };
function getQueryVariable(variable: string) {
     var query = window.location.search;
     query = query.slice(1);
     console.log("格式化url结果----" + query)
     var vars = query.split("&");
     for (var i = 0; i < vars.length; i++) {
         var pair = vars[i].split("=");
         if (pair[0] == variable) {
             return pair[1];
         }
     }
     return false;
 }

export default getQueryVariable;
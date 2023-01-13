import { getRoute } from "./router"

// now you can get the route you need by point to it by call the parents namt to child name by operator ->

console.log(getRoute("public->login",{},""))
// the first param is address to route means find public and get login URL , the second param is inputs if nessessary ex : for /:id/user is call like {id:4}
// the third param is the hashtag to page if require like example.com/#about is call like => getRoute('pulic->main', {},"about") whithout HASHTAG part

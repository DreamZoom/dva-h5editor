
export default {
   num:1,
   NewID:function(){
   	   return new Date().getTime()+"_"+this.num;
   }

}
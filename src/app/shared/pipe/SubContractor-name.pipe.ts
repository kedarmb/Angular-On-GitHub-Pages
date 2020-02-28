import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'subContractorname',
    pure: true
  })
  export class SubContractorName implements PipeTransform {
    transform(id: string, args?:Array<object>): any {
      console.log("ssssssssssss",id,args)
      return this.getName(id,args);
    }
    getName(id:string,args:Array<object>): String{
      const newObj= args.filter(obj=>obj["_id"]==id)
      if(newObj&&newObj.length){
   
         return newObj[0]["name"]
      }else{
      return "no name"
      }
    }
  }
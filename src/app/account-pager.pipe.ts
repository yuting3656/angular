import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountPager'
})
export class AccountPagerPipe implements PipeTransform {

  transform(pipeDate): any {
    console.log(`from pipe ${pipeDate.value}`) // 想要 try pipe 改 status ==> 啟動 可是GG...
    return pipeDate
  }

}

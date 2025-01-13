import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchName' })
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((value: any) => {
      return (value.groupName.toLocaleLowerCase().includes(args));
    })

  }
}
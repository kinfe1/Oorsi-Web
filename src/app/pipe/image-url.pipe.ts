import { Pipe, PipeTransform } from '@angular/core';
import { NO_PICTURE_IMG, PICTURE_REPO_URL } from '../const';

@Pipe({
  name: 'oorsiImgURL'
})
export class ImageURLPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (undefined == value || null == value || value.length == 0) {
      return NO_PICTURE_IMG;
    }
    return PICTURE_REPO_URL + '/' + value;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
  transform(originalSize: number, args?: any): { size: number; unit: string } {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

    if (originalSize === 0) {
      return { size: 0, unit: 'B' };
    }

    const sizesIndex = Math.floor(Math.log(originalSize) / Math.log(1024));

    return {
      unit: sizes[sizesIndex],
      size: Math.round(originalSize / Math.pow(1024, sizesIndex))
    };
  }
}

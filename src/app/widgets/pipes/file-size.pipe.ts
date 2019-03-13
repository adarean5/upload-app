import { Pipe, PipeTransform } from '@angular/core';

/**
 * A pipe for converting the file size in bytes to the greatest possible unit
 *  without hitting a decimal.
 *
 * @export
 * @class FileSizePipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
  /**
   *
   *
   * @param {number} originalSize - File size in bytes.
   * @param {*} [args] - Not important.
   * @returns {{ size: number; unit: string }} - Contains the size of the file
   *  converted to a greater unit, along with the abbreviation.
   * @memberof FileSizePipe
   */
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

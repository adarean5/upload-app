/**
 * Model represents the information we need to display a file in the table.
 *
 * @export
 * @class FileInfo
 *
 * @param name - Name of the file.
 * @param size - Size of the file in bytes.
 * @param displaySize - Human friendly file size information.
 * @param displaySize.size - Original size converted to a higher unit (B => MB, GB, ...)
 * @param displaySize.unit - Unit (MB, GB, ...) to display next to the size.
 * @param creationDate - Date when the file was created.
 */
export class FileInfo {
  name: string;
  size: number;
  displaySize: {
    size: number;
    unit: string;
  };
  creationDate: Date;
}

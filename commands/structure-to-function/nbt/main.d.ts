//#region src/nbt-tag.d.ts
declare enum NBTTag {
  EndOfCompound = 0,
  Uint8 = 1,
  Int16 = 2,
  Int32 = 3,
  Int64 = 4,
  Float = 5,
  Double = 6,
  Uint8Array = 7,
  String = 8,
  List = 9,
  Compound = 10,
  Int32Array = 11,
  Int64Array = 12
}
//#endregion
//#region src/cursor.d.ts
interface ICursor {
  readonly buffer: Uint8Array;
  readonly view: DataView;
  pointer: number;
}
declare class Cursor<T extends ArrayBufferLike = ArrayBufferLike> {
  readonly buffer: Uint8Array<T>;
  readonly view: DataView<T>;
  pointer: number;
  /**
   * Zero-Copy
   */
  static create<T extends ArrayBufferLike = ArrayBufferLike>(buffer: Uint8Array<T>): Cursor<T>;
  protected constructor(buffer: Uint8Array<T>, view?: DataView<T>, pointer?: number);
  /**
   * Zero-Copy
   */
  getEncapsulation(length: number): Cursor<T>;
  /**
   * Zero-Copy
   */
  getSliceSpan(length: number): Uint8Array<T>;
  /**
   * Zero-Copy
   */
  readSliceSpan(length: number): Uint8Array<T>;
  /**
   * Zero-Copy
   */
  getRemainingBytes(): Uint8Array<T>;
  /**
   * Zero-Copy
   */
  getProcessedBytes(): Uint8Array<T>;
  get processedBytesSize(): number;
  readUint8(): number;
  readUint16(littleEndian?: boolean): number;
  readUint32(littleEndian?: boolean): number;
  readBigUint64(littleEndian?: boolean): bigint;
  readFloat32(littleEndian?: boolean): number;
  readFloat64(littleEndian?: boolean): number;
  writeUint8(value: number): void;
  writeUint16(value: number, littleEndian?: boolean): void;
  writeUint32(value: number, littleEndian?: boolean): void;
  writeBigUint64(value: bigint, littleEndian?: boolean): void;
  writeFloat32(value: number, littleEndian?: boolean): void;
  writeFloat64(value: number, littleEndian?: boolean): void;
  writeSliceSpan(value: Uint8Array): void;
  get isEndOfStream(): boolean;
  get availableSize(): number;
  reset(): this;
}
//#endregion
//#region src/writers/writer-like.d.ts
interface WriterLike {
  writeType(cursor: ICursor, value: NBTTag): void;
  writeStringLength(cursor: ICursor, length: number): void;
  writeArrayLength(cursor: ICursor, length: number): void;
  [NBTTag.Uint8](cursor: ICursor, value: number): void;
  [NBTTag.Int16](cursor: ICursor, value: number): void;
  [NBTTag.Int32](cursor: ICursor, value: number): void;
  [NBTTag.Int64](cursor: ICursor, value: bigint): void;
  [NBTTag.Float](cursor: ICursor, value: number): void;
  [NBTTag.Double](cursor: ICursor, value: number): void;
  [NBTTag.Uint8Array](cursor: ICursor, value: Uint8Array): void;
  [NBTTag.String](cursor: ICursor, value: string): void;
  [NBTTag.Int32Array](cursor: ICursor, value: Int32Array): void;
  [NBTTag.Int64Array](cursor: ICursor, value: BigInt64Array): void;
  [NBTTag.List](cursor: ICursor, value: unknown[]): void;
  [NBTTag.Compound](cursor: ICursor, value: object): void;
  determinateType(_: unknown): NBTTag;
}
//#endregion
//#region src/writers/general.d.ts
declare class GeneralWriter implements WriterLike {
  readonly littleEndian: boolean;
  readonly textEncoder: TextEncoder;
  constructor(littleEndian: boolean, textEncoder: TextEncoder);
  writeType(_cursor: Cursor, _: number): void;
  writeStringLength(_cursor: Cursor, _: number): void;
  writeArrayLength(_cursor: Cursor, _: number): void;
  1(cursor: Cursor, _: number): void;
  2(cursor: Cursor, _: number): void;
  3(cursor: Cursor, _: number): void;
  4(cursor: Cursor, _: bigint): void;
  5(cursor: Cursor, _: number): void;
  6(cursor: Cursor, _: number): void;
  7(cursor: Cursor, _: Uint8Array): void;
  8(cursor: Cursor, _: string): void;
  9(cursor: Cursor, _: unknown[]): void;
  10(cursor: Cursor, _: object): void;
  11(cursor: Cursor, _: Int32Array): void;
  12(cursor: Cursor, _: BigInt64Array): void;
  determinateType(_: unknown): NBTTag;
}
declare const NBT_FORMAT_WRITER: GeneralWriter;
declare const NBT_BIG_ENDIAN_FORMAT_WRITER: GeneralWriter;
//#endregion
//#region src/writers/index.d.ts
declare function writeRootSync(cursor: Cursor, value: unknown, format?: WriterLike, root?: string): void;
declare function writeExplicitSync(cursor: Cursor, value: unknown, type: NBTTag, format?: WriterLike): void;
declare function writeSync(cursor: Cursor, value: unknown, format?: WriterLike): void;
//#endregion
//#region src/readers/reader-like.d.ts
interface ReaderLike {
  readType(cursor: Cursor): NBTTag;
  readStringLength(cursor: Cursor): number;
  readArrayLength(cursor: Cursor): number;
  [NBTTag.Uint8](cursor: Cursor): number;
  [NBTTag.Int16](cursor: Cursor): number;
  [NBTTag.Int32](cursor: Cursor): number;
  [NBTTag.Int64](cursor: Cursor): bigint;
  [NBTTag.Float](cursor: Cursor): number;
  [NBTTag.Double](cursor: Cursor): number;
  [NBTTag.Uint8Array](cursor: Cursor): Uint8Array;
  [NBTTag.String](cursor: Cursor): string;
  [NBTTag.Int32Array](cursor: Cursor): Int32Array;
  [NBTTag.Int64Array](cursor: Cursor): BigInt64Array;
  [NBTTag.List](cursor: Cursor): unknown[];
  [NBTTag.Compound](cursor: Cursor): object;
}
//#endregion
//#region src/readers/general.d.ts
declare class GeneralReader implements ReaderLike {
  readonly littleEndian: boolean;
  readonly textEncoder: TextDecoder;
  constructor(littleEndian: boolean, textEncoder: TextDecoder);
  readType(_: Cursor): NBTTag;
  readArrayLength(_: Cursor): number;
  readStringLength(_: Cursor): number;
  /**
   *  TagType.byte
   */
  1(cursor: Cursor): number;
  /**
   *  TagType.Short
   */
  2(cursor: Cursor): number;
  /**
   *  TagType.Int
   */
  3(cursor: Cursor): number;
  /**
   *  TagType.Long
   */
  4(cursor: Cursor): bigint;
  /**
   *  TagType.Float
   */
  5(cursor: Cursor): number;
  /**
   *  TagType.Double
   */
  6(cursor: Cursor): number;
  /**
   *  TagType.ByteArray
   */
  7(cursor: Cursor): Uint8Array;
  /**
   *  TagType.String
   */
  8(cursor: Cursor): string;
  11(cursor: Cursor): Int32Array;
  12(cursor: Cursor): BigInt64Array;
  9(cursor: Cursor): unknown[];
  10(cursor: Cursor): object;
}
declare const NBT_FORMAT_READER: GeneralReader;
declare const NBT_BIG_ENDIAN_FORMAT_READER: GeneralReader;
//#endregion
//#region src/readers/index.d.ts
declare function readRootSync<T = unknown>(cursor: Cursor, format?: ReaderLike): T;
declare function readExplicitSync<T = unknown>(cursor: Cursor, type: NBTTag, format?: ReaderLike): T;
declare function readSync<T = unknown>(cursor: Cursor, format?: ReaderLike): T;
//#endregion
export { Cursor, GeneralReader, GeneralWriter, ICursor, NBTTag, NBT_BIG_ENDIAN_FORMAT_READER, NBT_BIG_ENDIAN_FORMAT_WRITER, NBT_FORMAT_READER, NBT_FORMAT_WRITER, ReaderLike, WriterLike, readExplicitSync, readRootSync, readSync, writeExplicitSync, writeRootSync, writeSync };
//# sourceMappingURL=main.d.ts.map
Opened TS Playground and felt like a challenge (I'm sure it's been done before).

Addition/multiplication with binary in TS types. Seems to handle types into somewhere in the billions, lots of room for optimizations.

```ts
// Gives squiglies if they don't match
declare const byteEquals: <A extends readonly Bit[], B extends A>(
  ...args: [A] extends [never]
    ? ["A is never"]
    : [B] extends [never]
    ? ["B is never"]
    : []
) => void;

byteEquals<
  MultiplyBin<
    AddBin<Multiply<100, 234>, DecimalToBin<10_000>>,
    DecimalToBin<100_000>
  >,
  DecimalToBin<3_340_000_000>
>();
```

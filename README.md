Opened TS Playground and felt like a challenge (I'm sure it's been done before).

Addition/multiplication with binary in TS types.

```ts
// Gives squiglies if they don't match
declare const byteEquals: <A extends Byte, B extends A>() => void;

byteEquals<Add<2, 5>, DecimalToBin<7>>();
byteEquals<DecimalToBin<7>, Byte<0, 0, 0, 0, 0, 1, 1, 1>>();
byteEquals<Multiply<2, 5>, DecimalToBin<10>>();
byteEquals<DecimalToBin<10>, Byte<0, 0, 0, 0, 1, 0, 1, 0>>();
byteEquals<Multiply<5, 0>, DecimalToBin<0>>();
byteEquals<DecimalToBin<0>, Byte<0, 0, 0, 0, 0, 0, 0, 0>>();
byteEquals<Multiply<50, 5>, DecimalToBin<250>>();
```

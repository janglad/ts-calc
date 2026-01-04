type Bit = 1 | 0;

type Or<A extends Bit, B extends Bit> = A extends 1
  ? B extends 1
    ? 1
    : 1
  : B extends 1
  ? 1
  : 0;
type And<A extends Bit, B extends Bit> = A extends 1
  ? B extends 1
    ? 1
    : 0
  : 0;
type XOr<A extends Bit, B extends Bit> = A extends 1
  ? B extends 1
    ? 0
    : 1
  : B extends 1
  ? 1
  : 0;

type Byte<
  _128 extends Bit = Bit,
  _64 extends Bit = Bit,
  _32 extends Bit = Bit,
  _16 extends Bit = Bit,
  _8 extends Bit = Bit,
  _4 extends Bit = Bit,
  _2 extends Bit = Bit,
  _1 extends Bit = Bit,
> = readonly [
  _128: _128,
  _64: _64,
  _32: _32,
  _16: _16,
  _8: _8,
  _4: _4,
  _2: _2,
  _1: _1,
];

type ToByte<A> = A extends readonly [
  infer _128 extends Bit,
  infer _64 extends Bit,
  infer _32 extends Bit,
  infer _16 extends Bit,
  infer _8 extends Bit,
  infer _4 extends Bit,
  infer _2 extends Bit,
  infer _1 extends Bit,
]
  ? Byte<_128, _64, _32, _16, _8, _4, _2, _1>
  : never;

type AddBin<
  A extends readonly Bit[],
  B extends readonly Bit[],
  Carry extends Bit = 0,
> = A extends readonly [
  ...infer AHead extends readonly Bit[],
  infer ATail extends Bit,
]
  ? B extends readonly [
      ...infer BHead extends readonly Bit[],
      infer BTail extends Bit,
    ]
    ? [
        ...AddBin<
          AHead,
          BHead,
          Or<Or<And<ATail, BTail>, And<ATail, Carry>>, And<BTail, Carry>>
        >,
        Or<XOr<XOr<ATail, BTail>, Carry>, And<And<ATail, BTail>, Carry>>,
      ]
    : Carry extends 1
    ? never
    : []
  : Carry extends 1
  ? never
  : [];

type Test = XOr<0, 0>;

type TimesTwo<A extends Byte> = A[0] extends 1
  ? never
  : Byte<A[1], A[2], A[3], A[4], A[5], A[6], A[7], 0>;

type MapAnd<A extends readonly Bit[], B extends Bit> = {
  [K in keyof A]: And<A[K], B>;
};

type MultiplyBin<
  A extends Byte,
  B extends readonly Bit[],
> = B extends readonly 0[]
  ? Digits[0]
  : B extends readonly [
      ...infer BHead extends readonly Bit[],
      infer BTail extends Bit,
    ]
  ? AddBin<MapAnd<A, BTail>, MultiplyBin<TimesTwo<A>, BHead>>
  : Digits[0];

type Digits = {
  0: Byte<0, 0, 0, 0, 0, 0, 0, 0>;
  1: Byte<0, 0, 0, 0, 0, 0, 0, 1>;
  2: Byte<0, 0, 0, 0, 0, 0, 1, 0>;
  3: Byte<0, 0, 0, 0, 0, 0, 1, 1>;
  4: Byte<0, 0, 0, 0, 0, 1, 0, 0>;
  5: Byte<0, 0, 0, 0, 0, 1, 0, 1>;
  6: Byte<0, 0, 0, 0, 0, 1, 1, 0>;
  7: Byte<0, 0, 0, 0, 0, 1, 1, 1>;
  8: Byte<0, 0, 0, 0, 1, 0, 0, 0>;
  9: Byte<0, 0, 0, 0, 1, 0, 0, 1>;
};
type Digit = keyof Digits;

type PowersOfTenMultiplicants = [
  _1: Digits[1],
  _10: Byte<0, 0, 0, 0, 1, 0, 1, 0>,
  _100: Byte<0, 1, 1, 0, 0, 1, 0, 0>,
  ...never[],
];

type StringToDigitArray<T> = T extends `${infer Head extends
  Digit}${infer Tail}`
  ? [Head, ...StringToDigitArray<Tail>]
  : [];

type FirstRest<A> = A extends [infer Head, ...infer Rest]
  ? [Head, Rest]
  : never;

type _DecimalToBin<
  Dec extends readonly Digit[],
  Multi extends readonly Byte[] = PowersOfTenMultiplicants,
> = Dec extends [
  ...infer Head extends readonly Digit[],
  infer Tail extends Digit,
]
  ? Multi extends [
      infer Multiplicant extends Byte,
      ...infer MultiRest extends readonly Byte[],
    ]
    ? AddBin<
        MultiplyBin<Digits[Tail], Multiplicant>,
        _DecimalToBin<Head, MultiRest>
      >
    : never
  : Digits[0];

type DecimalToBin<S extends number> = ToByte<
  _DecimalToBin<StringToDigitArray<`${S}`>>
>;

type Add<A extends number, B extends number> = ToByte<
  AddBin<DecimalToBin<A>, DecimalToBin<B>>
>;
type Multiply<A extends number, B extends number> = ToByte<
  MultiplyBin<DecimalToBin<A>, DecimalToBin<B>>
>;

// Gives squiglies if they don't match
declare const byteEquals: <A extends Byte, B extends A>() => void;

byteEquals<Add<2, 5>, DecimalToBin<7>>();
byteEquals<DecimalToBin<7>, Byte<0, 0, 0, 0, 0, 1, 1, 1>>();
byteEquals<Multiply<2, 5>, DecimalToBin<10>>();
byteEquals<DecimalToBin<10>, Byte<0, 0, 0, 0, 1, 0, 1, 0>>();
byteEquals<Multiply<5, 0>, DecimalToBin<0>>();
byteEquals<DecimalToBin<0>, Byte<0, 0, 0, 0, 0, 0, 0, 0>>();
byteEquals<Multiply<50, 5>, DecimalToBin<250>>();

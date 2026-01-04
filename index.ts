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

type Short<
  _32768 extends Bit,
  _16384 extends Bit,
  _8192 extends Bit,
  _4096 extends Bit,
  _2048 extends Bit,
  _1024 extends Bit,
  _512 extends Bit,
  _256 extends Bit,
  _128 extends Bit,
  _64 extends Bit,
  _32 extends Bit,
  _16 extends Bit,
  _8 extends Bit,
  _4 extends Bit,
  _2 extends Bit,
  _1 extends Bit
> = readonly [
  _32768: _32768,
  _16384: _16384,
  _8192: _8192,
  _4096: _4096,
  _2048: _2048,
  _1024: _1024,
  _512: _512,
  _256: _256,
  _128: _128,
  _64: _64,
  _32: _32,
  _16: _16,
  _8: _8,
  _4: _4,
  _2: _2,
  _1: _1
];

type AnyShort = Short<
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit
>;

type ToShort<A> = A extends readonly [
  infer _32768 extends Bit,
  infer _16384 extends Bit,
  infer _8192 extends Bit,
  infer _4096 extends Bit,
  infer _2048 extends Bit,
  infer _1024 extends Bit,
  infer _512 extends Bit,
  infer _256 extends Bit,
  infer _128 extends Bit,
  infer _64 extends Bit,
  infer _32 extends Bit,
  infer _16 extends Bit,
  infer _8 extends Bit,
  infer _4 extends Bit,
  infer _2 extends Bit,
  infer _1 extends Bit
]
  ? Short<
      _32768,
      _16384,
      _8192,
      _4096,
      _2048,
      _1024,
      _512,
      _256,
      _128,
      _64,
      _32,
      _16,
      _8,
      _4,
      _2,
      _1
    >
  : never;

type AddBin<
  A extends readonly Bit[],
  B extends readonly Bit[],
  Carry extends Bit = 0
> = A extends readonly [
  ...infer AHead extends readonly Bit[],
  infer ATail extends Bit
]
  ? B extends readonly [
      ...infer BHead extends readonly Bit[],
      infer BTail extends Bit
    ]
    ? [
        ...AddBin<
          AHead,
          BHead,
          Or<Or<And<ATail, BTail>, And<ATail, Carry>>, And<BTail, Carry>>
        >,
        Or<XOr<XOr<ATail, BTail>, Carry>, And<And<ATail, BTail>, Carry>>
      ]
    : Carry extends 1
    ? never
    : []
  : Carry extends 1
  ? never
  : [];

type TimesTwo<A extends AnyShort> = A[0] extends 1
  ? never
  : Short<
      A[1],
      A[2],
      A[3],
      A[4],
      A[5],
      A[6],
      A[7],
      A[8],
      A[9],
      A[10],
      A[11],
      A[12],
      A[13],
      A[14],
      A[15],
      0
    >;

type MapAnd<A extends readonly Bit[], B extends Bit> = {
  [K in keyof A]: And<A[K], B>;
};

type MultiplyBin<
  A extends AnyShort,
  B extends readonly Bit[]
> = B extends readonly 0[]
  ? Digits[0]
  : B extends readonly [
      ...infer BHead extends readonly Bit[],
      infer BTail extends Bit
    ]
  ? AddBin<MapAnd<A, BTail>, MultiplyBin<TimesTwo<A>, BHead>>
  : Digits[0];

type Digits = {
  0: Short<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0>;
  1: Short<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1>;
  2: Short<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0>;
  3: Short<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1>;
  4: Short<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0>;
  5: Short<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1>;
  6: Short<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0>;
  7: Short<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1>;
  8: Short<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0>;
  9: Short<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1>;
};
type Digit = keyof Digits;

type PowersOfTenMultiplicants = [
  _1: Digits[1],
  _10: Short<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0>,
  _100: Short<0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0>,
  _1000: Short<0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0>,
  _10000: Short<0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0>,
  ...never[]
];

byteEquals<PowersOfTenMultiplicants[0], Digits[1]>();
byteEquals<PowersOfTenMultiplicants[1], DecimalToBin<10>>();
byteEquals<PowersOfTenMultiplicants[2], DecimalToBin<100>>();
byteEquals<PowersOfTenMultiplicants[3], DecimalToBin<1000>>();
byteEquals<PowersOfTenMultiplicants[4], DecimalToBin<10000>>();

type StringToDigitArray<T> =
  T extends `${infer Head extends Digit}${infer Tail}`
    ? [Head, ...StringToDigitArray<Tail>]
    : [];

type FirstRest<A> = A extends [infer Head, ...infer Rest]
  ? [Head, Rest]
  : never;

type _DecimalToBin<
  Dec extends readonly Digit[],
  Multi extends readonly AnyShort[] = PowersOfTenMultiplicants
> = Dec extends [
  ...infer Head extends readonly Digit[],
  infer Tail extends Digit
]
  ? Multi extends [
      infer Multiplicant extends AnyShort,
      ...infer MultiRest extends readonly AnyShort[]
    ]
    ? AddBin<
        MultiplyBin<Digits[Tail], Multiplicant>,
        _DecimalToBin<Head, MultiRest>
      >
    : never
  : Digits[0];

type DecimalToBin<S extends number> = ToShort<
  _DecimalToBin<StringToDigitArray<`${S}`>>
>;

type Add<A extends number, B extends number> = ToShort<
  AddBin<DecimalToBin<A>, DecimalToBin<B>>
>;
type Multiply<A extends number, B extends number> = ToShort<
  MultiplyBin<DecimalToBin<A>, DecimalToBin<B>>
>;

// Gives squiglies if they don't match
declare const byteEquals: <A extends AnyShort, B extends A>(
  ...args: [A] extends [never]
    ? ["A is never"]
    : [B] extends [never]
    ? ["B is never"]
    : []
) => void;

byteEquals<Add<2, 5>, DecimalToBin<7>>();
byteEquals<
  DecimalToBin<7>,
  Short<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1>
>();
byteEquals<Multiply<2, 5>, DecimalToBin<10>>();
byteEquals<
  DecimalToBin<10>,
  Short<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0>
>();
byteEquals<Multiply<5, 0>, DecimalToBin<0>>();
byteEquals<
  DecimalToBin<0>,
  Short<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0>
>();
byteEquals<Multiply<500, 5>, DecimalToBin<2500>>();
byteEquals<
  DecimalToBin<2500>,
  Short<0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0>
>();
byteEquals<
  DecimalToBin<40000>,
  Short<1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0>
>();

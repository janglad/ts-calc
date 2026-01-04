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
    ? AddBin<A, [1]>
    : A
  : B extends readonly [
      ...infer BHead extends readonly Bit[],
      infer BTail extends Bit
    ]
  ? Carry extends 1
    ? AddBin<B, [1]>
    : B
  : Carry extends 1
  ? [1]
  : [];

type Test = AddBin<[0, 1, 1], [0, 0, 0, 0, 0, 0]>;

type TimesTwo<A extends readonly Bit[]> = [...A, 0];

type MapAnd<A extends readonly Bit[], B extends Bit> = {
  [K in keyof A]: And<A[K], B>;
};

type MultiplyBin<
  A extends readonly Bit[],
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
  0: [0];
  1: [1];
  2: [1, 0];
  3: [1, 1];
  4: [1, 0, 0];
  5: [1, 0, 1];
  6: [1, 1, 0];
  7: [1, 1, 1];
  8: [1, 0, 0, 0];
  9: [1, 0, 0, 1];
};
type Digit = keyof Digits;

type PowersOfTenMultiplicants = [
  _1: Digits[1],
  _10: [1, 0, 1, 0],
  _100: [1, 1, 0, 0, 1, 0, 0],
  _1000: [1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
  _10_000: [1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  _100_000: [1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
  _1_000_000: [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  _10_000_000: [
    1,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  _100_000_000: [
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  _1_000_000_000: [
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  _10_000_000_000: [
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  _100_000_000_000: [
    1,
    0,
    1,
    1,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  _1_000_000_000_000: [
    1,
    1,
    1,
    0,
    1,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],

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
  Multi extends readonly Bit[][] = PowersOfTenMultiplicants
> = Dec extends [
  ...infer Head extends readonly Digit[],
  infer Tail extends Digit
]
  ? Multi extends [
      infer Multiplicant extends readonly Bit[],
      ...infer MultiRest extends readonly Bit[][]
    ]
    ? AddBin<
        MultiplyBin<Digits[Tail], Multiplicant>,
        _DecimalToBin<Head, MultiRest>
      >
    : never
  : Digits[0];

type DecimalToBin<S extends number> = _DecimalToBin<StringToDigitArray<`${S}`>>;

type Add<A extends number, B extends number> = AddBin<
  DecimalToBin<A>,
  DecimalToBin<B>
>;

type Multiply<A extends number, B extends number> = MultiplyBin<
  DecimalToBin<A>,
  DecimalToBin<B>
>;

// Gives squiglies if they don't match
declare const byteEquals: <A extends readonly Bit[], B extends A>(
  ...args: [A] extends [never]
    ? ["A is never"]
    : [B] extends [never]
    ? ["B is never"]
    : []
) => void;

byteEquals<Add<2, 5>, DecimalToBin<7>>();
byteEquals<DecimalToBin<7>, [1, 1, 1]>();
byteEquals<Multiply<2, 5>, DecimalToBin<10>>();
byteEquals<DecimalToBin<10>, [1, 0, 1, 0]>();
byteEquals<Multiply<5, 0>, DecimalToBin<0>>();
byteEquals<DecimalToBin<0>, [0]>();
byteEquals<Multiply<500, 5>, DecimalToBin<2500>>();
byteEquals<DecimalToBin<2500>, [1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0]>();
byteEquals<
  DecimalToBin<40000>,
  [1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
>();

byteEquals<Multiply<10000, 10000>, DecimalToBin<100000000>>();

type test = MultiplyBin<
  AddBin<Multiply<100, 234>, DecimalToBin<10000>>,
  DecimalToBin<10000>
>;

type test2 = DecimalToBin<6_000_000_000>;

byteEquals<
  MultiplyBin<
    AddBin<Multiply<100, 234>, DecimalToBin<10_000>>,
    DecimalToBin<100_000>
  >,
  DecimalToBin<3_340_000_000>
>();

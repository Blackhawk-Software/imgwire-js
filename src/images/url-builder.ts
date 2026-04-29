import type { ImageSchema } from "../../generated/src/models/index.ts";

export const IMAGE_URL_PRESETS = [
  "thumbnail",
  "small",
  "medium",
  "large"
] as const;

export const IMAGE_URL_GRAVITY_TYPES = [
  "ce",
  "center",
  "north",
  "south",
  "east",
  "west",
  "northeast",
  "northwest",
  "southeast",
  "southwest",
  "attention",
  "entropy",
  "n",
  "no",
  "s",
  "so",
  "e",
  "ea",
  "w",
  "we",
  "ne",
  "noea",
  "se",
  "soea",
  "nw",
  "nowe",
  "sw",
  "sowe"
] as const;

export const IMAGE_URL_RESIZING_TYPES = [
  "cover",
  "contain",
  "fill",
  "inside",
  "outside",
  "fit",
  "fill-down",
  "force",
  "auto"
] as const;

export const IMAGE_URL_RESIZING_ALGORITHMS = [
  "nearest",
  "cubic",
  "mitchell",
  "lanczos2",
  "lanczos3"
] as const;

export const IMAGE_URL_OUTPUT_FORMATS = [
  "auto",
  "jpg",
  "jpeg",
  "png",
  "webp",
  "avif",
  "gif",
  "tiff"
] as const;

export const IMAGE_URL_ROTATE_ANGLES = [0, 90, 180, 270, 360] as const;

export type ImageUrlPreset = (typeof IMAGE_URL_PRESETS)[number];
export type GravityType = (typeof IMAGE_URL_GRAVITY_TYPES)[number];
export type ResizingType = (typeof IMAGE_URL_RESIZING_TYPES)[number];
export type ResizingAlgorithm = (typeof IMAGE_URL_RESIZING_ALGORITHMS)[number];
export type OutputFormat = (typeof IMAGE_URL_OUTPUT_FORMATS)[number];
export type RotateAngle = (typeof IMAGE_URL_ROTATE_ANGLES)[number];
export type BooleanString = "true" | "false" | "t" | "f" | "1" | "0";
export type BooleanLike = boolean | BooleanString;
export type ColorValue = string;
export type GravityValue =
  | GravityType
  | `${GravityType}:sm`
  | `${GravityType}:${number}:${number}`;

export type AdjustValue =
  | string
  | {
      brightness: number | string;
      saturation?: number | string;
      color?: number | string;
    };
export type ContrastValue =
  | number
  | string
  | {
      multiplier: number | string;
      pivot?: number | string;
    };
export type CropValue =
  | string
  | {
      x?: number | string;
      y?: number | string;
      width: number | string;
      height: number | string;
      gravity?: GravityValue;
    };
export type DuotoneValue =
  | string
  | {
      shadowColor: ColorValue;
      highlightColor: ColorValue;
    };
export type ExtendValue =
  | string
  | {
      top: number | string;
      right?: number | string;
      bottom?: number | string;
      left?: number | string;
      background?: ColorValue;
    };
export type ExtendAspectRatioValue =
  | number
  | string
  | {
      ratio?: number | string;
      width?: number | string;
      height?: number | string;
    };
export type FlipValue =
  | "vertical"
  | "horizontal"
  | "both"
  | `${BooleanString}:${BooleanString}`
  | {
      horizontal?: BooleanLike;
      vertical?: BooleanLike;
    };
export type GradientValue =
  | string
  | {
      colors: ColorValue[];
      angle?: number | string;
      opacity?: number | string;
      blend?: string;
    };
export type NegateValue =
  | BooleanLike
  | "alpha:true"
  | "alpha:false"
  | {
      alpha: BooleanLike;
    };
export type NormalizeValue =
  | BooleanLike
  | string
  | {
      lower: number | string;
      upper: number | string;
    };
export type PaddingValue =
  | string
  | number
  | {
      all?: number | string;
      x?: number | string;
      y?: number | string;
      top?: number | string;
      right?: number | string;
      bottom?: number | string;
      left?: number | string;
    };
export type RotateValue =
  | number
  | string
  | {
      angle: number | string;
      background?: ColorValue;
    };
export type SharpenValue =
  | boolean
  | number
  | string
  | {
      sigma?: number | string;
      m1?: number | string;
      m2?: number | string;
      x1?: number | string;
      y2?: number | string;
      y3?: number | string;
    };
export type WatermarkValue =
  | string
  | {
      image_id?: string;
      imageId?: string;
      gravity?: GravityValue;
      x?: number | string;
      y?: number | string;
    };
export type WatermarkPositionValue =
  | string
  | {
      gravity: GravityValue;
      x?: number | string;
      y?: number | string;
      opacity?: number | string;
      blend?: string;
    };
export type WatermarkShadowValue =
  | boolean
  | string
  | {
      color?: ColorValue;
      blur?: number | string;
      x?: number | string;
      y?: number | string;
    };
export type WatermarkSizeValue =
  | string
  | {
      width: number | string;
      height?: number | string;
      scale?: number | string;
    };
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };
export type WatermarkTextValue = string | { [key: string]: JsonValue };
export type ZoomValue =
  | number
  | string
  | {
      factor: number | string;
      gravity?: GravityValue;
    };

export type ImageUrlOptions = {
  preset?: ImageUrlPreset;
  adjust?: AdjustValue;
  a?: AdjustValue;
  background?: ColorValue;
  bg?: ColorValue;
  background_alpha?: number | string;
  bga?: number | string;
  blur?: boolean | number | string;
  bl?: boolean | number | string;
  brightness?: number | string;
  br?: number | string;
  color_profile?: string;
  cp?: string;
  icc?: string;
  colorize?: ColorValue;
  col?: ColorValue;
  contrast?: ContrastValue;
  co?: ContrastValue;
  crop?: CropValue;
  c?: CropValue;
  dpi?: number | string;
  dpr?: number | string;
  duotone?: DuotoneValue;
  dt?: DuotoneValue;
  enlarge?: BooleanLike;
  el?: BooleanLike;
  extend?: ExtendValue;
  ex?: ExtendValue;
  extend_aspect_ratio?: ExtendAspectRatioValue;
  extend_ar?: ExtendAspectRatioValue;
  exar?: ExtendAspectRatioValue;
  flip?: FlipValue;
  fl?: FlipValue;
  format?: OutputFormat;
  f?: OutputFormat;
  extension?: OutputFormat;
  ext?: OutputFormat;
  gradient?: GradientValue;
  gr?: GradientValue;
  gravity?: GravityValue;
  g?: GravityValue;
  height?: number | string;
  h?: number | string;
  hue?: number | string;
  hu?: number | string;
  keep_copyright?: BooleanLike;
  kcr?: BooleanLike;
  lightness?: number | string;
  l?: number | string;
  "min-height"?: number | string;
  min_height?: number | string;
  mh?: number | string;
  "min-width"?: number | string;
  min_width?: number | string;
  mw?: number | string;
  monochrome?: boolean | ColorValue;
  mc?: boolean | ColorValue;
  negate?: NegateValue;
  neg?: NegateValue;
  normalize?: NormalizeValue;
  normalise?: NormalizeValue;
  norm?: NormalizeValue;
  padding?: PaddingValue;
  pd?: PaddingValue;
  pixelate?: number | string;
  pix?: number | string;
  quality?: number | string;
  q?: number | string;
  resizing_algorithm?: ResizingAlgorithm;
  ra?: ResizingAlgorithm;
  resizing_type?: ResizingType;
  rotate?: RotateValue;
  rot?: RotateValue;
  saturation?: number | string;
  sa?: number | string;
  sharpen?: SharpenValue;
  sh?: SharpenValue;
  strip_color_profile?: BooleanLike;
  scp?: BooleanLike;
  strip_metadata?: BooleanLike;
  sm?: BooleanLike;
  watermark?: WatermarkValue;
  wm?: WatermarkValue;
  watermark_position?: WatermarkPositionValue;
  watermark_offset?: WatermarkPositionValue;
  wmp?: WatermarkPositionValue;
  watermark_rotate?: RotateValue;
  wm_rot?: RotateValue;
  wmr?: RotateValue;
  watermark_shadow?: WatermarkShadowValue;
  wmsh?: WatermarkShadowValue;
  watermark_size?: WatermarkSizeValue;
  wms?: WatermarkSizeValue;
  watermark_text?: WatermarkTextValue;
  wmt?: WatermarkTextValue;
  watermark_url?: string;
  wmu?: string;
  width?: number | string;
  w?: number | string;
  zoom?: ZoomValue;
  z?: ZoomValue;
};

export type ImgwireImage = ImageSchema & {
  url(options?: ImageUrlOptions): string;
};

type TransformationEntry = {
  canonical: string;
  cacheValue: string;
};

type Rule = {
  aliases: readonly string[];
  canonical: string;
  parse: (value: unknown, canonical: string) => TransformationEntry | null;
};

type JsonObject = { [key: string]: JsonValue };
type UnknownRecord = Record<string, unknown>;

class InvalidTransformationValueError extends Error {}

const GRAVITY_ALIASES = new Map<string, string>([
  ["n", "north"],
  ["no", "north"],
  ["s", "south"],
  ["so", "south"],
  ["e", "east"],
  ["ea", "east"],
  ["w", "west"],
  ["we", "west"],
  ["ne", "northeast"],
  ["noea", "northeast"],
  ["se", "southeast"],
  ["soea", "southeast"],
  ["nw", "northwest"],
  ["nowe", "northwest"],
  ["sw", "southwest"],
  ["sowe", "southwest"]
]);

const GRAVITY_VALUES = new Set([
  "ce",
  "center",
  "north",
  "south",
  "east",
  "west",
  "northeast",
  "northwest",
  "southeast",
  "southwest",
  "attention",
  "entropy"
]);

export class ImageUrlBuilder {
  constructor(private readonly image: ImageSchema) {}

  build(options: ImageUrlOptions = {}): string {
    const url = new URL(this.image.cdn_url);
    const entries = parseTransformationEntries(options);

    if (options.preset) {
      url.pathname = appendPresetToPath(url.pathname, options.preset);
    }

    if (entries.length === 0) {
      url.search = "";
      return url.toString();
    }

    entries.sort((left, right) =>
      left.canonical.localeCompare(right.canonical)
    );
    const searchParams = new URLSearchParams();
    for (const entry of entries) {
      searchParams.set(entry.canonical, entry.cacheValue);
    }
    url.search = searchParams.toString();
    return url.toString();
  }
}

export function extendImage(image: ImageSchema): ImgwireImage {
  const builder = new ImageUrlBuilder(image);
  return Object.assign(image, {
    url(options?: ImageUrlOptions) {
      return builder.build(options);
    }
  });
}

function parseTransformationEntries(
  options: ImageUrlOptions
): TransformationEntry[] {
  const entries: TransformationEntry[] = [];
  const seenCanonicals = new Set<string>();

  for (const rule of RULES) {
    const presentAliases = rule.aliases.filter((alias) =>
      Object.prototype.hasOwnProperty.call(options, alias)
    );
    if (presentAliases.length === 0) {
      continue;
    }
    if (presentAliases.length > 1) {
      throw new Error(`Duplicate transformation rule: ${rule.canonical}`);
    }

    if (seenCanonicals.has(rule.canonical)) {
      throw new Error(`Duplicate transformation rule: ${rule.canonical}`);
    }
    seenCanonicals.add(rule.canonical);

    try {
      const entry = rule.parse(
        (options as Record<string, unknown>)[presentAliases[0]],
        rule.canonical
      );
      if (entry) {
        entries.push(entry);
      }
    } catch (error) {
      if (!(error instanceof InvalidTransformationValueError)) {
        throw error;
      }
    }
  }

  return entries;
}

function appendPresetToPath(pathname: string, preset: ImageUrlPreset): string {
  return `${pathname}@${preset}`;
}

function createTransformation(
  canonical: string,
  cacheValue: string
): TransformationEntry {
  return { canonical, cacheValue };
}

function parseAdjust(value: unknown, canonical: string) {
  const objectValue = parseObjectValue(value, canonical);
  if (objectValue) {
    const brightness = parseNumberField(objectValue, canonical, "brightness");
    const saturation = parseOptionalNumberField(
      objectValue,
      canonical,
      "saturation"
    );
    const color = parseOptionalNumberField(objectValue, canonical, "color");
    requirePriorOptional(canonical, [
      ["saturation", saturation],
      ["color", color]
    ]);
    return createTransformation(
      canonical,
      joinDefined([brightness, saturation, color])
    );
  }

  const parts = parseString(value, canonical).split(":");
  if (parts.length < 1 || parts.length > 3) {
    invalid(canonical);
  }
  return createTransformation(
    canonical,
    parts.map((part) => formatNumber(parseNumber(part, canonical))).join(":")
  );
}

function parseWidth(value: unknown, canonical: string) {
  return createTransformation(
    canonical,
    formatNumber(parseInteger(value, canonical, { min: 1, max: 8192 }))
  );
}

function parseHeight(value: unknown, canonical: string) {
  return createTransformation(
    canonical,
    formatNumber(parseInteger(value, canonical, { min: 1, max: 8192 }))
  );
}

function parseResizingType(value: unknown, canonical: string) {
  const resizingType = parseString(value, canonical).trim().toLowerCase();
  const normalized =
    {
      auto: "inside",
      fit: "inside",
      "fill-down": "inside",
      force: "fill"
    }[resizingType] ?? resizingType;

  if (!["cover", "contain", "fill", "inside", "outside"].includes(normalized)) {
    invalid(canonical);
  }
  return createTransformation(canonical, normalized);
}

function parseResizingAlgorithm(value: unknown, canonical: string) {
  const algorithm = parseString(value, canonical).trim().toLowerCase();
  if (!IMAGE_URL_RESIZING_ALGORITHMS.includes(algorithm as ResizingAlgorithm)) {
    invalid(canonical);
  }
  return createTransformation(canonical, algorithm);
}

function parseMinWidth(value: unknown, canonical: string) {
  return parseWidth(value, canonical);
}

function parseMinHeight(value: unknown, canonical: string) {
  return parseHeight(value, canonical);
}

function parseZoom(value: unknown, canonical: string) {
  const objectValue = parseObjectValue(value, canonical);
  if (objectValue) {
    const factor = parseNumberField(objectValue, canonical, "factor", {
      min: 0,
      minExclusive: true
    });
    const gravity = parseOptionalStringField(objectValue, canonical, "gravity");
    return createTransformation(
      canonical,
      joinDefined([
        factor,
        gravity ? parseGravityValue(gravity, canonical) : undefined
      ])
    );
  }

  const parts = parseString(value, canonical).split(":");
  if (parts.length < 1 || parts.length > 2) {
    invalid(canonical);
  }
  const factor = formatNumber(
    parseNumber(parts[0], canonical, { min: 0, minExclusive: true })
  );
  const gravity =
    parts.length === 2 ? parseGravityValue(parts[1], canonical) : undefined;
  return createTransformation(canonical, joinDefined([factor, gravity]));
}

function parseDpi(value: unknown, canonical: string) {
  return createTransformation(
    canonical,
    formatNumber(parseInteger(value, canonical, { min: 1, max: 600 }))
  );
}

function parseDpr(value: unknown, canonical: string) {
  return createTransformation(
    canonical,
    formatNumber(parseNumber(value, canonical, { min: 0.01, max: 8 }))
  );
}

function parseEnlarge(value: unknown, canonical: string) {
  return parseBoolean(value, canonical)
    ? createTransformation(canonical, "true")
    : null;
}

function parseExtend(value: unknown, canonical: string) {
  const objectValue = parseObjectValue(value, canonical);
  if (objectValue) {
    const top = parseNumberField(objectValue, canonical, "top", { min: 0 });
    const right = parseOptionalNumberField(objectValue, canonical, "right", {
      min: 0
    });
    const bottom = parseOptionalNumberField(objectValue, canonical, "bottom", {
      min: 0
    });
    const left = parseOptionalNumberField(objectValue, canonical, "left", {
      min: 0
    });
    const background = parseOptionalStringField(
      objectValue,
      canonical,
      "background"
    );
    requirePriorOptional(canonical, [
      ["right", right],
      ["bottom", bottom],
      ["left", left],
      ["background", background]
    ]);
    return createTransformation(
      canonical,
      joinDefined([
        top,
        right,
        bottom,
        left,
        background ? parseColor(background, canonical) : undefined
      ])
    );
  }

  const parts = parseString(value, canonical).split(":");
  if (parts.length < 1 || parts.length > 5) {
    invalid(canonical);
  }
  const edges = parts
    .slice(0, 4)
    .map((part) => formatNumber(parseNumber(part, canonical, { min: 0 })));
  const background =
    parts.length === 5 ? parseColor(parts[4], canonical) : undefined;
  return createTransformation(canonical, joinDefined([...edges, background]));
}

function parseExtendAspectRatio(value: unknown, canonical: string) {
  const objectValue = parseObjectValue(value, canonical);
  if (objectValue) {
    const ratio = parseOptionalNumberField(objectValue, canonical, "ratio", {
      min: 0,
      minExclusive: true
    });
    if (ratio) {
      return createTransformation(canonical, ratio);
    }
    const width = parseNumberField(objectValue, canonical, "width", {
      min: 0,
      minExclusive: true
    });
    const height = parseNumberField(objectValue, canonical, "height", {
      min: 0,
      minExclusive: true
    });
    return createTransformation(canonical, `${width}:${height}`);
  }

  const raw = parseString(value, canonical);
  const parts = raw.split(":");
  if (parts.length === 1) {
    return createTransformation(
      canonical,
      formatNumber(
        parseNumber(parts[0], canonical, { min: 0, minExclusive: true })
      )
    );
  }
  if (parts.length !== 2) {
    invalid(canonical);
  }
  return createTransformation(
    canonical,
    parts
      .map((part) =>
        formatNumber(
          parseNumber(part, canonical, { min: 0, minExclusive: true })
        )
      )
      .join(":")
  );
}

function parseGravity(value: unknown, canonical: string) {
  return createTransformation(
    canonical,
    parseGravityValue(parseString(value, canonical), canonical, {
      allowOffsets: true,
      allowSmart: true
    })
  );
}

function parseCrop(value: unknown, canonical: string) {
  const objectValue = parseObjectValue(value, canonical);
  if (objectValue) {
    const width = parseNumberField(objectValue, canonical, "width", {
      min: 0,
      minExclusive: true
    });
    const height = parseNumberField(objectValue, canonical, "height", {
      min: 0,
      minExclusive: true
    });
    const x = parseOptionalIntegerField(objectValue, canonical, "x");
    const y = parseOptionalIntegerField(objectValue, canonical, "y");
    const gravity = parseOptionalStringField(objectValue, canonical, "gravity");
    if ((x === undefined) !== (y === undefined)) {
      invalid(canonical);
    }
    return createTransformation(
      canonical,
      joinDefined([
        x,
        y,
        width,
        height,
        gravity ? parseGravityValue(gravity, canonical) : undefined
      ])
    );
  }

  const parts = parseString(value, canonical).split(":");
  if (parts.length === 2) {
    return createTransformation(
      canonical,
      `${parsePositiveDimension(parts[0], canonical)}:${parsePositiveDimension(
        parts[1],
        canonical
      )}`
    );
  }
  if (parts.length === 3) {
    return createTransformation(
      canonical,
      `${parsePositiveDimension(parts[0], canonical)}:${parsePositiveDimension(
        parts[1],
        canonical
      )}:${parseGravityValue(parts[2], canonical)}`
    );
  }
  if (parts.length === 4) {
    return createTransformation(
      canonical,
      parts
        .map((part, index) =>
          index < 2
            ? formatNumber(parseInteger(part, canonical))
            : parsePositiveDimension(part, canonical)
        )
        .join(":")
    );
  }
  if (parts.length === 5) {
    if (isIntegerLike(parts[2])) {
      return createTransformation(
        canonical,
        `${formatNumber(parseInteger(parts[0], canonical))}:${formatNumber(
          parseInteger(parts[1], canonical)
        )}:${parsePositiveDimension(parts[2], canonical)}:${parsePositiveDimension(
          parts[3],
          canonical
        )}:${parseGravityValue(parts[4], canonical)}`
      );
    }
    return createTransformation(
      canonical,
      `${parsePositiveDimension(parts[0], canonical)}:${parsePositiveDimension(
        parts[1],
        canonical
      )}:${parseGravityValue(parts.slice(2).join(":"), canonical, {
        allowOffsets: true
      })}`
    );
  }
  invalid(canonical);
}

function parsePadding(value: unknown, canonical: string) {
  const objectValue = parseObjectValue(value, canonical);
  if (objectValue) {
    const all = parseOptionalNumberField(objectValue, canonical, "all", {
      min: 0
    });
    if (all) {
      return createTransformation(canonical, all);
    }
    const x = parseOptionalNumberField(objectValue, canonical, "x", { min: 0 });
    const y = parseOptionalNumberField(objectValue, canonical, "y", { min: 0 });
    if (x || y) {
      if (!x || !y) {
        invalid(canonical);
      }
      return createTransformation(canonical, `${x}:${y}`);
    }
    const top = parseNumberField(objectValue, canonical, "top", { min: 0 });
    const right = parseOptionalNumberField(objectValue, canonical, "right", {
      min: 0
    });
    const bottom = parseOptionalNumberField(objectValue, canonical, "bottom", {
      min: 0
    });
    const left = parseOptionalNumberField(objectValue, canonical, "left", {
      min: 0
    });
    requirePriorOptional(canonical, [
      ["right", right],
      ["bottom", bottom],
      ["left", left]
    ]);
    return createTransformation(
      canonical,
      joinDefined([top, right, bottom, left])
    );
  }

  const parts = parseString(value, canonical).split(":");
  if (parts.length < 1 || parts.length > 4) {
    invalid(canonical);
  }
  return createTransformation(
    canonical,
    parts
      .map((part) => formatNumber(parseNumber(part, canonical, { min: 0 })))
      .join(":")
  );
}

function parseRotate(value: unknown, canonical: string) {
  return parseRotateLike(value, canonical);
}

function parseWatermarkRotate(value: unknown, canonical: string) {
  return parseRotateLike(value, canonical);
}

function parseRotateLike(value: unknown, canonical: string) {
  const objectValue = parseObjectValue(value, canonical);
  if (objectValue) {
    const angle = parseNumberField(objectValue, canonical, "angle");
    const background = parseOptionalStringField(
      objectValue,
      canonical,
      "background"
    );
    return createTransformation(
      canonical,
      joinDefined([
        angle,
        background ? parseColor(background, canonical) : undefined
      ])
    );
  }

  const parts = parseString(value, canonical).split(":");
  if (parts.length < 1 || parts.length > 2) {
    invalid(canonical);
  }
  const angle = formatNumber(parseNumber(parts[0], canonical));
  const background =
    parts.length === 2 ? parseColor(parts[1], canonical) : undefined;
  return createTransformation(canonical, joinDefined([angle, background]));
}

function parseFlip(value: unknown, canonical: string) {
  const objectValue = parseObjectValue(value, canonical);
  if (objectValue) {
    const horizontal = parseOptionalBooleanField(
      objectValue,
      canonical,
      "horizontal"
    );
    const vertical = parseOptionalBooleanField(
      objectValue,
      canonical,
      "vertical"
    );
    return createFlipTransformation(
      horizontal ?? false,
      vertical ?? false,
      canonical
    );
  }

  const raw = parseString(value, canonical).trim().toLowerCase();
  if (["vertical", "horizontal", "both"].includes(raw)) {
    return createTransformation(canonical, raw);
  }
  const parts = raw.split(":");
  if (parts.length !== 2) {
    invalid(canonical);
  }
  return createFlipTransformation(
    parseBoolean(parts[0], canonical),
    parseBoolean(parts[1], canonical),
    canonical
  );
}

function createFlipTransformation(
  horizontal: boolean,
  vertical: boolean,
  canonical: string
) {
  if (horizontal && vertical) {
    return createTransformation(canonical, "both");
  }
  if (horizontal) {
    return createTransformation(canonical, "horizontal");
  }
  if (vertical) {
    return createTransformation(canonical, "vertical");
  }
  return null;
}

function parseBackground(value: unknown, canonical: string) {
  return createTransformation(canonical, parseColor(value, canonical));
}

function parseBackgroundAlpha(value: unknown, canonical: string) {
  return createTransformation(
    canonical,
    formatNumber(parseNumber(value, canonical, { min: 0, max: 1 }))
  );
}

function parseBlur(value: unknown, canonical: string) {
  if (isBooleanLike(value)) {
    return parseBoolean(value, canonical)
      ? createTransformation(canonical, "true")
      : null;
  }
  return createTransformation(
    canonical,
    formatNumber(parseNumber(value, canonical, { min: 0.3, max: 100 }))
  );
}

function parseSharpen(value: unknown, canonical: string) {
  if (isBooleanLike(value)) {
    return parseBoolean(value, canonical)
      ? createTransformation(canonical, "true")
      : null;
  }
  const objectValue = parseObjectValue(value, canonical, {
    parseJsonString: true
  });
  if (objectValue) {
    return createTransformation(
      canonical,
      serializeStableJsonObject(objectValue)
    );
  }
  return createTransformation(
    canonical,
    formatNumber(parseNumber(value, canonical, { min: 0, minExclusive: true }))
  );
}

function parsePixelate(value: unknown, canonical: string) {
  return createTransformation(
    canonical,
    formatNumber(parseInteger(value, canonical, { min: 2, max: 256 }))
  );
}

function parseBooleanTransformation(value: unknown, canonical: string) {
  return createTransformation(
    canonical,
    parseBoolean(value, canonical) ? "true" : "false"
  );
}

function parseQuality(value: unknown, canonical: string) {
  return createTransformation(
    canonical,
    formatNumber(parseInteger(value, canonical, { min: 1, max: 100 }))
  );
}

function parseFormat(value: unknown, canonical: string) {
  const format = parseString(value, canonical).trim().toLowerCase();
  if (!IMAGE_URL_OUTPUT_FORMATS.includes(format as OutputFormat)) {
    invalid(canonical);
  }
  return createTransformation(canonical, format === "jpg" ? "jpeg" : format);
}

function parseColorProfile(value: unknown, canonical: string) {
  const colorProfile = parseString(value, canonical).trim().toLowerCase();
  if (!["srgb", "rgb16", "cmyk", "keep", "preserve"].includes(colorProfile)) {
    invalid(canonical);
  }
  return createTransformation(canonical, colorProfile);
}

function parseColorize(value: unknown, canonical: string) {
  return createTransformation(canonical, parseColor(value, canonical));
}

function parseDuotone(value: unknown, canonical: string) {
  const objectValue = parseObjectValue(value, canonical);
  if (objectValue) {
    return createTransformation(
      canonical,
      `${parseColorField(
        objectValue,
        canonical,
        "shadowColor"
      )}:${parseColorField(objectValue, canonical, "highlightColor")}`
    );
  }

  const parts = parseString(value, canonical).split(":");
  if (parts.length !== 2) {
    invalid(canonical);
  }
  return createTransformation(
    canonical,
    `${parseColor(parts[0], canonical)}:${parseColor(parts[1], canonical)}`
  );
}

function parseContrast(value: unknown, canonical: string) {
  const objectValue = parseObjectValue(value, canonical);
  if (objectValue) {
    const multiplier = parseNumberField(objectValue, canonical, "multiplier");
    const pivot = parseOptionalNumberField(objectValue, canonical, "pivot");
    return createTransformation(canonical, joinDefined([multiplier, pivot]));
  }

  const parts = parseString(value, canonical).split(":");
  if (parts.length < 1 || parts.length > 2) {
    invalid(canonical);
  }
  return createTransformation(
    canonical,
    parts.map((part) => formatNumber(parseNumber(part, canonical))).join(":")
  );
}

function parseBrightness(value: unknown, canonical: string) {
  return createTransformation(
    canonical,
    formatNumber(parseNumber(value, canonical, { min: 0.01, max: 10 }))
  );
}

function parseLightness(value: unknown, canonical: string) {
  return parseBrightness(value, canonical);
}

function parseSaturation(value: unknown, canonical: string) {
  return parseBrightness(value, canonical);
}

function parseHue(value: unknown, canonical: string) {
  return createTransformation(
    canonical,
    formatNumber(parseNumber(value, canonical))
  );
}

function parseGradient(value: unknown, canonical: string) {
  const objectValue = parseObjectValue(value, canonical);
  if (objectValue) {
    const colorsValue = objectValue.colors;
    if (!Array.isArray(colorsValue) || colorsValue.length < 2) {
      invalid(canonical);
    }
    const colors = colorsValue
      .map((color) => parseColor(color, canonical))
      .join(",");
    const angle = parseOptionalNumberField(objectValue, canonical, "angle");
    const opacity = parseOptionalNumberField(
      objectValue,
      canonical,
      "opacity",
      {
        min: 0,
        max: 1
      }
    );
    const blend = parseOptionalStringField(objectValue, canonical, "blend");
    requirePriorOptional(canonical, [
      ["angle", angle],
      ["opacity", opacity],
      ["blend", blend]
    ]);
    return createTransformation(
      canonical,
      joinDefined([colors, angle, opacity, blend])
    );
  }

  const parts = parseString(value, canonical).split(":");
  if (parts.length < 1 || parts.length > 4) {
    invalid(canonical);
  }
  const colors = parts[0].split(",");
  if (colors.length < 2) {
    invalid(canonical);
  }
  const colorList = colors
    .map((color) => parseColor(color, canonical))
    .join(",");
  const angle =
    parts.length >= 2
      ? formatNumber(parseNumber(parts[1], canonical))
      : undefined;
  const opacity =
    parts.length >= 3
      ? formatNumber(parseNumber(parts[2], canonical, { min: 0, max: 1 }))
      : undefined;
  const blend =
    parts.length === 4 ? parseNonEmptyString(parts[3], canonical) : undefined;
  return createTransformation(
    canonical,
    joinDefined([colorList, angle, opacity, blend])
  );
}

function parseMonochrome(value: unknown, canonical: string) {
  if (isBooleanLike(value)) {
    return parseBoolean(value, canonical)
      ? createTransformation(canonical, "true")
      : null;
  }
  return createTransformation(canonical, parseColor(value, canonical));
}

function parseNegate(value: unknown, canonical: string) {
  const objectValue = parseObjectValue(value, canonical);
  if (objectValue) {
    return createTransformation(
      canonical,
      `alpha:${parseBooleanField(objectValue, canonical, "alpha") ? "true" : "false"}`
    );
  }
  const raw = parseString(value, canonical).trim();
  if (isBooleanLike(raw)) {
    return parseBoolean(raw, canonical)
      ? createTransformation(canonical, "true")
      : null;
  }
  const parts = raw.split(":");
  if (parts.length !== 2 || parts[0] !== "alpha") {
    invalid(canonical);
  }
  return createTransformation(
    canonical,
    `alpha:${parseBoolean(parts[1], canonical) ? "true" : "false"}`
  );
}

function parseNormalize(value: unknown, canonical: string) {
  const objectValue = parseObjectValue(value, canonical);
  if (objectValue) {
    return createTransformation(
      canonical,
      `${parseNumberField(objectValue, canonical, "lower")}:${parseNumberField(
        objectValue,
        canonical,
        "upper"
      )}`
    );
  }
  if (isBooleanLike(value)) {
    return createTransformation(
      canonical,
      parseBoolean(value, canonical) ? "true" : "false"
    );
  }
  const parts = parseString(value, canonical).split(":");
  if (parts.length !== 2) {
    invalid(canonical);
  }
  return createTransformation(
    canonical,
    parts.map((part) => formatNumber(parseNumber(part, canonical))).join(":")
  );
}

function parseWatermark(value: unknown, canonical: string) {
  const objectValue = parseObjectValue(value, canonical);
  if (objectValue) {
    const imageId = parseStringField(objectValue, canonical, [
      "image_id",
      "imageId"
    ]);
    const gravity = parseOptionalStringField(objectValue, canonical, "gravity");
    const x = parseOptionalIntegerField(objectValue, canonical, "x");
    const y = parseOptionalIntegerField(objectValue, canonical, "y");
    requirePriorOptional(canonical, [
      ["gravity", gravity],
      ["x", x],
      ["y", y]
    ]);
    return createTransformation(
      canonical,
      joinDefined([
        imageId,
        gravity ? parseGravityValue(gravity, canonical) : undefined,
        x,
        y
      ])
    );
  }

  const parts = parseString(value, canonical).split(":");
  if (parts.length < 1 || parts.length > 4) {
    invalid(canonical);
  }
  const imageId = parseNonEmptyString(parts[0], canonical);
  const gravity =
    parts.length >= 2 ? parseGravityValue(parts[1], canonical) : undefined;
  const x =
    parts.length >= 3
      ? formatNumber(parseInteger(parts[2], canonical))
      : undefined;
  const y =
    parts.length === 4
      ? formatNumber(parseInteger(parts[3], canonical))
      : undefined;
  return createTransformation(canonical, joinDefined([imageId, gravity, x, y]));
}

function parseWatermarkPosition(value: unknown, canonical: string) {
  const objectValue = parseObjectValue(value, canonical);
  if (objectValue) {
    const gravity = parseGravityValue(
      parseStringField(objectValue, canonical, "gravity"),
      canonical
    );
    const x = parseOptionalIntegerField(objectValue, canonical, "x");
    const y = parseOptionalIntegerField(objectValue, canonical, "y");
    const opacity = parseOptionalNumberField(
      objectValue,
      canonical,
      "opacity",
      {
        min: 0,
        max: 1
      }
    );
    const blend = parseOptionalStringField(objectValue, canonical, "blend");
    requirePriorOptional(canonical, [
      ["x", x],
      ["y", y],
      ["opacity", opacity],
      ["blend", blend]
    ]);
    return createTransformation(
      canonical,
      joinDefined([gravity, x, y, opacity, blend])
    );
  }

  const parts = parseString(value, canonical).split(":");
  if (parts.length < 1 || parts.length > 5) {
    invalid(canonical);
  }
  const gravity = parseGravityValue(parts[0], canonical);
  const x =
    parts.length >= 2
      ? formatNumber(parseInteger(parts[1], canonical))
      : undefined;
  const y =
    parts.length >= 3
      ? formatNumber(parseInteger(parts[2], canonical))
      : undefined;
  const opacity =
    parts.length >= 4
      ? formatNumber(parseNumber(parts[3], canonical, { min: 0, max: 1 }))
      : undefined;
  const blend =
    parts.length === 5 ? parseNonEmptyString(parts[4], canonical) : undefined;
  return createTransformation(
    canonical,
    joinDefined([gravity, x, y, opacity, blend])
  );
}

function parseWatermarkShadow(value: unknown, canonical: string) {
  if (isBooleanLike(value)) {
    return parseBoolean(value, canonical)
      ? createTransformation(canonical, "true")
      : null;
  }
  const objectValue = parseObjectValue(value, canonical);
  if (objectValue) {
    const color = parseOptionalStringField(objectValue, canonical, "color");
    if (!color) {
      invalid(canonical);
    }
    const blur = parseOptionalNumberField(objectValue, canonical, "blur", {
      min: 0
    });
    const x = parseOptionalIntegerField(objectValue, canonical, "x");
    const y = parseOptionalIntegerField(objectValue, canonical, "y");
    requirePriorOptional(canonical, [
      ["blur", blur],
      ["x", x],
      ["y", y]
    ]);
    return createTransformation(
      canonical,
      joinDefined([parseColor(color, canonical), blur, x, y])
    );
  }

  const parts = parseString(value, canonical).split(":");
  if (parts.length < 1 || parts.length > 4) {
    invalid(canonical);
  }
  const color = parseColor(parts[0], canonical);
  const blur =
    parts.length >= 2
      ? formatNumber(parseNumber(parts[1], canonical, { min: 0 }))
      : undefined;
  const x =
    parts.length >= 3
      ? formatNumber(parseInteger(parts[2], canonical))
      : undefined;
  const y =
    parts.length === 4
      ? formatNumber(parseInteger(parts[3], canonical))
      : undefined;
  return createTransformation(canonical, joinDefined([color, blur, x, y]));
}

function parseWatermarkSize(value: unknown, canonical: string) {
  const objectValue = parseObjectValue(value, canonical);
  if (objectValue) {
    const width = parseNumberField(objectValue, canonical, "width", {
      min: 0,
      minExclusive: true
    });
    const height = parseOptionalNumberField(objectValue, canonical, "height", {
      min: 0,
      minExclusive: true
    });
    const scale = parseOptionalNumberField(objectValue, canonical, "scale", {
      min: 0,
      minExclusive: true
    });
    requirePriorOptional(canonical, [
      ["height", height],
      ["scale", scale]
    ]);
    return createTransformation(canonical, joinDefined([width, height, scale]));
  }

  const parts = parseString(value, canonical).split(":");
  if (parts.length < 1 || parts.length > 3) {
    invalid(canonical);
  }
  return createTransformation(
    canonical,
    parts
      .map((part) =>
        formatNumber(
          parseNumber(part, canonical, { min: 0, minExclusive: true })
        )
      )
      .join(":")
  );
}

function parseWatermarkText(value: unknown, canonical: string) {
  const objectValue = parseObjectValue(value, canonical, {
    parseJsonString: true
  });
  if (objectValue) {
    return createTransformation(
      canonical,
      serializeStableJsonObject(objectValue)
    );
  }
  return createTransformation(
    canonical,
    parseNonEmptyString(parseString(value, canonical), canonical)
  );
}

function parseWatermarkUrl(value: unknown, canonical: string) {
  const raw = parseNonEmptyString(parseString(value, canonical), canonical);
  if (raw.startsWith("https://")) {
    return createTransformation(
      canonical,
      encodeBase64(normalizeHttpsUrl(raw, canonical))
    );
  }

  const decoded = decodeBase64(raw);
  if (decoded && decoded.startsWith("https://")) {
    normalizeHttpsUrl(decoded, canonical);
    return createTransformation(canonical, raw);
  }

  invalid(canonical);
}

function parseInteger(
  value: unknown,
  label: string,
  { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = {}
) {
  const raw = stringifyValue(value, label).trim();
  if (!/^-?\d+$/.test(raw)) {
    invalid(label);
  }
  const parsedValue = Number.parseInt(raw, 10);
  if (
    !Number.isSafeInteger(parsedValue) ||
    parsedValue < min ||
    parsedValue > max
  ) {
    invalid(label);
  }
  return parsedValue;
}

function parseNumber(
  value: unknown,
  label: string,
  {
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    minExclusive = false
  } = {}
) {
  const raw = stringifyValue(value, label).trim();
  if (raw === "") {
    invalid(label);
  }
  const parsedValue = Number(raw);
  if (
    !Number.isFinite(parsedValue) ||
    (minExclusive ? parsedValue <= min : parsedValue < min) ||
    parsedValue > max
  ) {
    invalid(label);
  }
  return parsedValue;
}

function parsePositiveDimension(value: unknown, label: string) {
  return formatNumber(
    parseNumber(value, label, { min: 0, minExclusive: true })
  );
}

function parseBoolean(value: unknown, label: string) {
  if (typeof value === "boolean") {
    return value;
  }
  const raw = stringifyValue(value, label).trim().toLowerCase();
  if (["true", "t", "1"].includes(raw)) {
    return true;
  }
  if (["false", "f", "0"].includes(raw)) {
    return false;
  }
  invalid(label);
}

function parseString(value: unknown, label: string) {
  return stringifyValue(value, label);
}

function stringifyValue(value: unknown, label: string) {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  invalid(label);
}

function parseColor(value: unknown, label: string) {
  const raw = parseNonEmptyString(stringifyValue(value, label).trim(), label);
  const hexColor = raw.startsWith("#") ? raw.slice(1) : raw;
  if (/^(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(hexColor)) {
    return hexColor.toLowerCase();
  }

  const parts = raw.split(":");
  if (parts.length === 3 || parts.length === 4) {
    const rgb = parts
      .slice(0, 3)
      .map((part) =>
        formatNumber(parseInteger(part, label, { min: 0, max: 255 }))
      );
    if (parts.length === 3) {
      return rgb.join(":");
    }
    const alpha = formatNumber(
      parseNumber(parts[3], label, { min: 0, max: 1 })
    );
    return [...rgb, alpha].join(":");
  }

  invalid(label);
}

function parseGravityValue(
  value: unknown,
  label: string,
  { allowOffsets = false, allowSmart = true } = {}
) {
  const raw = parseNonEmptyString(stringifyValue(value, label).trim(), label);
  const parts = raw.split(":");
  if (
    parts.length === 2 &&
    parts[0] === "ce" &&
    parts[1] === "sm" &&
    allowSmart
  ) {
    return "attention";
  }
  if (parts.length === 1) {
    return normalizeGravityToken(parts[0], label);
  }
  if (parts.length === 3 && allowOffsets) {
    return `${normalizeGravityToken(parts[0], label)}:${formatNumber(
      parseInteger(parts[1], label)
    )}:${formatNumber(parseInteger(parts[2], label))}`;
  }
  invalid(label);
}

function normalizeGravityToken(value: string, label: string) {
  const normalized = value.trim().toLowerCase();
  const mapped = GRAVITY_ALIASES.get(normalized) ?? normalized;
  if (!GRAVITY_VALUES.has(mapped)) {
    invalid(label);
  }
  return mapped;
}

function parseObjectValue(
  value: unknown,
  label: string,
  { parseJsonString = true } = {}
): UnknownRecord | null {
  if (isRecord(value)) {
    return value;
  }
  if (!parseJsonString || typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed.startsWith("{")) {
    return null;
  }
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (!isRecord(parsed)) {
      invalid(label);
    }
    return parsed;
  } catch {
    invalid(label);
  }
}

function parseStringField(
  value: UnknownRecord,
  label: string,
  keys: string | readonly string[]
) {
  const fieldValue = readField(value, keys);
  if (fieldValue === undefined) {
    invalid(label);
  }
  return parseNonEmptyString(stringifyValue(fieldValue, label).trim(), label);
}

function parseOptionalStringField(
  value: UnknownRecord,
  label: string,
  key: string
) {
  if (!Object.prototype.hasOwnProperty.call(value, key)) {
    return undefined;
  }
  return parseNonEmptyString(stringifyValue(value[key], label).trim(), label);
}

function parseNumberField(
  value: UnknownRecord,
  label: string,
  key: string,
  options?: Parameters<typeof parseNumber>[2]
) {
  if (!Object.prototype.hasOwnProperty.call(value, key)) {
    invalid(label);
  }
  return formatNumber(parseNumber(value[key], label, options));
}

function parseOptionalNumberField(
  value: UnknownRecord,
  label: string,
  key: string,
  options?: Parameters<typeof parseNumber>[2]
) {
  if (!Object.prototype.hasOwnProperty.call(value, key)) {
    return undefined;
  }
  return formatNumber(parseNumber(value[key], label, options));
}

function parseOptionalIntegerField(
  value: UnknownRecord,
  label: string,
  key: string
) {
  if (!Object.prototype.hasOwnProperty.call(value, key)) {
    return undefined;
  }
  return formatNumber(parseInteger(value[key], label));
}

function parseBooleanField(value: UnknownRecord, label: string, key: string) {
  if (!Object.prototype.hasOwnProperty.call(value, key)) {
    invalid(label);
  }
  return parseBoolean(value[key], label);
}

function parseOptionalBooleanField(
  value: UnknownRecord,
  label: string,
  key: string
) {
  if (!Object.prototype.hasOwnProperty.call(value, key)) {
    return undefined;
  }
  return parseBoolean(value[key], label);
}

function parseColorField(value: UnknownRecord, label: string, key: string) {
  if (!Object.prototype.hasOwnProperty.call(value, key)) {
    invalid(label);
  }
  return parseColor(value[key], label);
}

function readField(value: UnknownRecord, keys: string | readonly string[]) {
  const fieldNames = typeof keys === "string" ? [keys] : keys;
  for (const key of fieldNames) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      return value[key];
    }
  }
  return undefined;
}

function serializeStableJsonObject(value: UnknownRecord) {
  return JSON.stringify(toJsonValue(value));
}

function toJsonValue(value: unknown): JsonValue {
  if (value === null) {
    return null;
  }
  if (typeof value === "string" || typeof value === "boolean") {
    return value;
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      invalid("json");
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => toJsonValue(item));
  }
  if (isRecord(value)) {
    const jsonObject: JsonObject = {};
    for (const key of Object.keys(value).sort()) {
      const childValue = value[key];
      if (childValue === undefined) {
        continue;
      }
      jsonObject[key] = toJsonValue(childValue);
    }
    return jsonObject;
  }
  invalid("json");
}

function normalizeHttpsUrl(value: string, label: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") {
      invalid(label);
    }
    return url.toString();
  } catch {
    invalid(label);
  }
}

function encodeBase64(value: string) {
  if (typeof btoa === "function") {
    return btoa(value);
  }
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "utf8").toString("base64");
  }
  throw new Error("No base64 encoder is available in this environment");
}

function decodeBase64(value: string) {
  try {
    if (typeof atob === "function") {
      return atob(value);
    }
    if (typeof Buffer !== "undefined") {
      return Buffer.from(value, "base64").toString("utf8");
    }
  } catch {
    return null;
  }
  return null;
}

function joinDefined(values: Array<string | undefined>) {
  return values
    .filter((value): value is string => value !== undefined)
    .join(":");
}

function parseNonEmptyString(value: string, label: string) {
  if (value === "") {
    invalid(label);
  }
  return value;
}

function requirePriorOptional(
  label: string,
  values: Array<[string, string | undefined]>
) {
  let sawMissing = false;
  for (const [, value] of values) {
    if (value === undefined) {
      sawMissing = true;
      continue;
    }
    if (sawMissing) {
      invalid(label);
    }
  }
}

function formatNumber(value: number) {
  return String(value);
}

function isIntegerLike(value: string) {
  return /^-?\d+$/.test(value.trim());
}

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isBooleanLike(value: unknown) {
  if (typeof value === "boolean") {
    return true;
  }
  if (typeof value !== "string") {
    return false;
  }
  return ["true", "false", "t", "f", "1", "0"].includes(
    value.trim().toLowerCase()
  );
}

function invalid(label: string): never {
  throw new InvalidTransformationValueError(
    `Invalid transformation rule value for ${label}`
  );
}

const RULES: Rule[] = [
  { canonical: "adjust", aliases: ["a", "adjust"], parse: parseAdjust },
  {
    canonical: "background",
    aliases: ["bg", "background"],
    parse: parseBackground
  },
  {
    canonical: "background_alpha",
    aliases: ["bga", "background_alpha"],
    parse: parseBackgroundAlpha
  },
  { canonical: "blur", aliases: ["bl", "blur"], parse: parseBlur },
  {
    canonical: "brightness",
    aliases: ["br", "brightness"],
    parse: parseBrightness
  },
  {
    canonical: "color_profile",
    aliases: ["cp", "icc", "color_profile"],
    parse: parseColorProfile
  },
  { canonical: "colorize", aliases: ["col", "colorize"], parse: parseColorize },
  { canonical: "contrast", aliases: ["co", "contrast"], parse: parseContrast },
  { canonical: "crop", aliases: ["c", "crop"], parse: parseCrop },
  { canonical: "dpi", aliases: ["dpi"], parse: parseDpi },
  { canonical: "dpr", aliases: ["dpr"], parse: parseDpr },
  { canonical: "duotone", aliases: ["dt", "duotone"], parse: parseDuotone },
  { canonical: "enlarge", aliases: ["el", "enlarge"], parse: parseEnlarge },
  { canonical: "extend", aliases: ["ex", "extend"], parse: parseExtend },
  {
    canonical: "extend_aspect_ratio",
    aliases: ["exar", "extend_ar", "extend_aspect_ratio"],
    parse: parseExtendAspectRatio
  },
  { canonical: "flip", aliases: ["fl", "flip"], parse: parseFlip },
  {
    canonical: "format",
    aliases: ["f", "format", "ext", "extension"],
    parse: parseFormat
  },
  { canonical: "gradient", aliases: ["gr", "gradient"], parse: parseGradient },
  { canonical: "gravity", aliases: ["g", "gravity"], parse: parseGravity },
  { canonical: "height", aliases: ["h", "height"], parse: parseHeight },
  { canonical: "hue", aliases: ["hu", "hue"], parse: parseHue },
  {
    canonical: "keep_copyright",
    aliases: ["kcr", "keep_copyright"],
    parse: parseBooleanTransformation
  },
  {
    canonical: "lightness",
    aliases: ["l", "lightness"],
    parse: parseLightness
  },
  {
    canonical: "min-height",
    aliases: ["mh", "min_height", "min-height"],
    parse: parseMinHeight
  },
  {
    canonical: "min-width",
    aliases: ["mw", "min_width", "min-width"],
    parse: parseMinWidth
  },
  {
    canonical: "monochrome",
    aliases: ["mc", "monochrome"],
    parse: parseMonochrome
  },
  { canonical: "negate", aliases: ["neg", "negate"], parse: parseNegate },
  {
    canonical: "normalize",
    aliases: ["norm", "normalise", "normalize"],
    parse: parseNormalize
  },
  { canonical: "padding", aliases: ["pd", "padding"], parse: parsePadding },
  { canonical: "pixelate", aliases: ["pix", "pixelate"], parse: parsePixelate },
  { canonical: "quality", aliases: ["q", "quality"], parse: parseQuality },
  {
    canonical: "resizing_algorithm",
    aliases: ["ra", "resizing_algorithm"],
    parse: parseResizingAlgorithm
  },
  {
    canonical: "resizing_type",
    aliases: ["resizing_type"],
    parse: parseResizingType
  },
  { canonical: "rotate", aliases: ["rot", "rotate"], parse: parseRotate },
  {
    canonical: "saturation",
    aliases: ["sa", "saturation"],
    parse: parseSaturation
  },
  { canonical: "sharpen", aliases: ["sh", "sharpen"], parse: parseSharpen },
  {
    canonical: "strip_color_profile",
    aliases: ["scp", "strip_color_profile"],
    parse: parseBooleanTransformation
  },
  {
    canonical: "strip_metadata",
    aliases: ["sm", "strip_metadata"],
    parse: parseBooleanTransformation
  },
  {
    canonical: "watermark",
    aliases: ["wm", "watermark"],
    parse: parseWatermark
  },
  {
    canonical: "watermark_position",
    aliases: ["wmp", "watermark_offset", "watermark_position"],
    parse: parseWatermarkPosition
  },
  {
    canonical: "watermark_rotate",
    aliases: ["wmr", "wm_rot", "watermark_rotate"],
    parse: parseWatermarkRotate
  },
  {
    canonical: "watermark_shadow",
    aliases: ["wmsh", "watermark_shadow"],
    parse: parseWatermarkShadow
  },
  {
    canonical: "watermark_size",
    aliases: ["wms", "watermark_size"],
    parse: parseWatermarkSize
  },
  {
    canonical: "watermark_text",
    aliases: ["wmt", "watermark_text"],
    parse: parseWatermarkText
  },
  {
    canonical: "watermark_url",
    aliases: ["wmu", "watermark_url"],
    parse: parseWatermarkUrl
  },
  { canonical: "width", aliases: ["w", "width"], parse: parseWidth },
  { canonical: "zoom", aliases: ["z", "zoom"], parse: parseZoom }
];

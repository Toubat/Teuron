import { describe, it, expect } from "vitest";
import type { VTypeDecleration } from "../openai/vtype";
import { VType, createVTypeDeclerationString } from "../openai/vtype";

describe("createVarTypeDeclerationString", () => {
  it("number type", () => {
    const typeNode: VTypeDecleration<VType.Number> = {
      type: VType.Number,
      inner: VType.Number,
    };

    const result = createVTypeDeclerationString(typeNode);
    expect(result).toBe("number");
  });

  it("boolean type", () => {
    const typeNode: VTypeDecleration<VType.Boolean> = {
      type: VType.Boolean,
      inner: VType.Boolean,
    };

    const result = createVTypeDeclerationString(typeNode);
    expect(result).toBe("boolean");
  });

  it("string type", () => {
    const typeNode: VTypeDecleration<VType.String> = {
      type: VType.String,
      inner: VType.String,
    };

    const result = createVTypeDeclerationString(typeNode);
    expect(result).toBe("string");
  });

  it("simple array type", () => {
    const typeNode: VTypeDecleration<VType.Array> = {
      type: VType.Array,
      inner: {
        type: VType.String,
        inner: VType.String,
      },
    };

    const result = createVTypeDeclerationString(typeNode);
    expect(result).toBe("string[]");
  });

  it("simple object type", () => {
    const typeNode: VTypeDecleration<VType.Object> = {
      type: VType.Object,
      inner: {
        a: {
          type: VType.String,
          inner: VType.String,
        },
        b: {
          type: VType.Number,
          inner: VType.Number,
        },
      },
    };

    const result = createVTypeDeclerationString(typeNode);
    expect(result).toMatchSnapshot();
  });

  it("array of simple object", () => {
    const arrayOfObject: VTypeDecleration<VType.Array> = {
      type: VType.Array,
      inner: {
        type: VType.Object,
        inner: {
          a: {
            type: VType.String,
            inner: VType.String,
          },
          b: {
            type: VType.Number,
            inner: VType.Number,
          },
        },
      },
    };

    const result = createVTypeDeclerationString(arrayOfObject);
    expect(result).toMatchSnapshot();
  });

  it("object of array of simple object", () => {
    const arrayOfObject: VTypeDecleration<VType.Array> = {
      type: VType.Array,
      inner: {
        type: VType.Object,
        inner: {
          a: {
            type: VType.String,
            inner: VType.String,
          },
          b: {
            type: VType.Number,
            inner: VType.Number,
          },
        },
      },
    };

    const objectOfArrayOfObject: VTypeDecleration<VType.Object> = {
      type: VType.Object,
      inner: {
        a: {
          type: VType.Number,
          inner: VType.Number,
        },
        b: arrayOfObject,
      },
    };

    const result = createVTypeDeclerationString(objectOfArrayOfObject);
    expect(result).toMatchSnapshot();
  });

  it("array of object of array of simple object", () => {
    const arrayOfObject: VTypeDecleration<VType.Array> = {
      type: VType.Array,
      inner: {
        type: VType.Object,
        inner: {
          a: {
            type: VType.String,
            inner: VType.String,
          },
          b: {
            type: VType.Number,
            inner: VType.Number,
          },
        },
      },
    };

    const objectOfArrayOfObject: VTypeDecleration<VType.Object> = {
      type: VType.Object,
      inner: {
        a: {
          type: VType.Number,
          inner: VType.Number,
        },
        b: arrayOfObject,
      },
    };

    const arrayOfObjectOfArrayOfObject: VTypeDecleration<VType.Array> = {
      type: VType.Array,
      inner: objectOfArrayOfObject,
    };

    const result = createVTypeDeclerationString(arrayOfObjectOfArrayOfObject);
    expect(result).toMatchSnapshot();
  });

  it("complex object", () => {
    const complexObject: VTypeDecleration<VType.Object> = {
      type: VType.Object,
      inner: {
        a: {
          type: VType.String,
          inner: VType.String,
        },
        b: {
          type: VType.Number,
          inner: VType.Number,
        },
        c: {
          type: VType.Boolean,
          inner: VType.Boolean,
        },
        d: {
          type: VType.Array,
          inner: {
            type: VType.String,
            inner: VType.String,
          },
        },
        e: {
          type: VType.Array,
          inner: {
            type: VType.Number,
            inner: VType.Number,
          },
        },
        f: {
          type: VType.Array,
          inner: {
            type: VType.Boolean,
            inner: VType.Boolean,
          },
        },
        g: {
          type: VType.Array,
          inner: {
            type: VType.Object,
            inner: {
              a: {
                type: VType.String,
                inner: VType.String,
              },
              b: {
                type: VType.Number,
                inner: VType.Number,
              },
              c: {
                type: VType.Array,
                inner: {
                  type: VType.Object,
                  inner: {
                    a: {
                      type: VType.String,
                      inner: VType.String,
                    },
                    b: {
                      type: VType.Number,
                      inner: VType.Number,
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    const result = createVTypeDeclerationString(complexObject);
    expect(result).toMatchSnapshot();
  });

  it("complex nested object & array", () => {
    const complexObject: VTypeDecleration<VType.Object> = {
      type: VType.Object,
      inner: {
        arr: {
          type: VType.Array,
          inner: {
            type: VType.Object,
            inner: {
              a: {
                type: VType.String,
                inner: VType.String,
              },
              b: {
                type: VType.Array,
                inner: {
                  type: VType.Object,
                  inner: {
                    a: {
                      type: VType.Object,
                      inner: {
                        a: {
                          type: VType.Object,
                          inner: {
                            a: {
                              type: VType.Number,
                              inner: VType.Number,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    const result = createVTypeDeclerationString(complexObject);
    expect(result).toMatchSnapshot();
  });
});

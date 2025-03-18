import { test, vi, expect, describe } from "vitest"
import { orSome } from "../src"

describe("orSome", () => {
  const runFn = vi.fn()
  orSome([true, false], (p) => {
    expect(p.key).toBe(0)
    expect(p.message).toBeFalsy()
  })
  orSome([false, false], runFn)
  expect(runFn).not.toHaveBeenCalled()

  orSome([{ key: "one", condition: true }, false], (p) => {
    expect(p.key).toBe("one")
  })

  orSome(
    [false, { key: "two", condition: true, message: "condition two pass" }],
    (p) => {
      expect(p.key).toBe("two")
      expect(p.message).toBe("condition two pass")
    },
  )

  orSome([true, { key: "two", condition: true }], (p) => {
    expect(p.key).toBe(0)
  })

  // key can be ignored
  orSome([false, { condition: true, message: "condition two pass" }], (p) => {
    expect(p.key).toBe(1)
    expect(p.message).toBe("condition two pass")
  })

  test("should throw error due to the expression be evaluated", () => {
    let foo = {
      bar: null,
    }
    try {
      orSome([!foo.bar, foo.bar.baz.boo], () => {})
    } catch (error) {
      expect(error.message).toBe(
        `Cannot read properties of null (reading 'baz')`,
      )
    }
  })

  test("should evaluate the expression lazily by wrapping it with a function", () => {
    let foo = {
      bar: null,
    }
    orSome([!foo.bar, () => foo.bar.baz.boo], (p) => {
      expect(p.key).toBe(0)
    })
  })
})

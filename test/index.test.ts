import { test, vi, expect } from "vitest"
import { orSome } from "../src"

test("orSome", () => {
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
})

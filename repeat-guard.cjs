const orig = String.prototype.repeat;

String.prototype.repeat = function repeatGuard(count) {
  if (typeof count === "number" && count < 0) {
    console.error("\n[repeat-guard] repeat called with:", count);
    console.error(new Error("[repeat-guard] stack").stack);
    count = 0; // crash防止
  }
  return orig.call(this, count);
};

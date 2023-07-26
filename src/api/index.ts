import myAxios from "./myAxios";

// 获取背景
export function getBackground() {
  return myAxios.get("/bg");
}

export function getTranslateResult(
  keywords: string,
  config: Record<string, string>
) {
  return myAxios.get("/fanyi", {
    params: {
      keywords,
      config,
    },
  });
}

import myAxios from "./myAxios";

// 获取背景
export function getBackground() {
  return myAxios.get("/bg");
}

export const getTranslateResult = async (
  keywords: string,
  config: Record<string, string>
) => {
  if (!keywords) {
    return null;
  }
  return await myAxios.get("/fanyi", {
    params: {
      keywords,
      config,
    },
  });
};

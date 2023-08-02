import myAxios from "./myAxios";

// 获取背景
export function getBackground() {
  return myAxios.get("/bg");
}

// 获取翻译结果
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

// 获取音乐
export const getMusicApi = (keywords: string) => {
  if (!keywords) return null;
  return myAxios.get("/music", {
    params: {
      keywords,
    },
  });
};

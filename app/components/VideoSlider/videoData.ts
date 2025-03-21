export type VideoType = {
  videoId: string;
  previewImage: string;
  options: {
    autoplay: boolean;
    mute: boolean;
    loop: boolean;
  };
};

export const videos: VideoType[] = [
  {
    videoId: "X0aXS1YHOag",
    previewImage: "/images/4b205000253d42b51ec0ab79ee1db814.webp",
    options: {
      autoplay: false,
      mute: true,
      loop: true
    }
  },
  {
    videoId: "Su8T0MaKTms",
    previewImage: "/images/55e5594349c9d06d35fc06f8f73bc03e.webp",
    options: {
      autoplay: false,
      mute: false,
      loop: true
    }
  },
  {
    videoId: "ZfoWctJFfrY",
    previewImage: "/images/6468de59d3fdaa54508a0b23eb0f8f31.webp",
    options: {
      autoplay: false,
      mute: false,
      loop: true
    }
  }
]; 
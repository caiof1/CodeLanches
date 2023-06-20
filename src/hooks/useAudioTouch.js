// Hooks
import { useEffect } from "react";
import { useFetchOrders } from "./useFetchOrders";
import { useUpdateOrder } from "./useUpdateOrder";

// Audio
import touch from "../audio/toque.mp3";

export const useAudioTouch = () => {
  const idControl = "ZZ4lKQ0pbvoQl52OmeBv";

  const { documents: control } = useFetchOrders("control");
  const { updateOrder } = useUpdateOrder("control");

  const audio = new Audio(touch);

  useEffect(() => {
    if (control[0]?.acessAudio) {
      audio.play();
      control[0].acessAudio = false;
      updateOrder(idControl, control[0]);
    }
  }, [control]);
};

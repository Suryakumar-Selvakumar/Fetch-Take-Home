import confetti from "canvas-confetti";

export const fireWorks = () => {
  const duration = 4 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 9999,
  };

  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);

  return interval;
};

export const heartEmojis = () => {
  const scalar = 2;
  const heart = confetti.shapeFromText({ text: "❤️", scalar });

  const defaults = {
    spread: 360,
    ticks: 60,
    gravity: 0,
    decay: 0.96,
    startVelocity: 20,
    shapes: [heart],
    scalar,
  };

  const shoot = () => {
    confetti({
      ...defaults,
      particleCount: 30,
      zIndex: 9999,
    });

    confetti({
      ...defaults,
      particleCount: 5,
      zIndex: 9999,
    });

    confetti({
      ...defaults,
      particleCount: 15,
      scalar: scalar / 2,
      zIndex: 9999,
      shapes: ["circle"],
    });
  };

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
};

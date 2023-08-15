(function clock(window) {
  const hourHand = document.querySelector('.hour-hand');
  const minuteHand = document.querySelector('.minute-hand');
  const secondHand = document.querySelector('.second-hand');
  

  const setDate = () => {
    const now = new Date();

    const seconds = now.getSeconds();
    const secondRatio = seconds / 60;
    const secondDegree = (secondRatio * 360) + 90;

    const minute = now.getMinutes();
    const minuteDegree = (minute + secondRatio) / 60 * 360 + 90;

    const hour = now.getHours();
    const hourDegree = (hour + minute/60) / 12 * 360 + 90;

    secondHand.style.transform = `rotate(${secondDegree}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegree}deg)`;
    hourHand.style.transform = `rotate(${hourDegree}deg)`;
  }

  window.setInterval(setDate, 1000);
})(window);

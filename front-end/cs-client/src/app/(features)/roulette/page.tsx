"use client";
import { useCollapseContext } from "@/context/collapse-context";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { HandCoins, Coins } from "lucide-react";

const RoulettePage = () => {
  const [countdown, setCountdown] = useState(10.0); // Bắt đầu với 10.00 giây
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState(null);
  const [lastStopPosition, setLastStopPosition] = useState(null); // Lưu vị trí dừng của lần quay trước
  const [betAmount, setBetAmount] = useState(""); // Số tiền cược
  const [previousRolls, setPreviousRolls] = useState([]); // Lịch sử các lần quay trước
  const { isCollapsed } = useCollapseContext();
  const marginLeft = isCollapsed ? "96px" : "256px";

  // Danh sách items: Chỉ có 1 Special và các Knife/Wrench
  const baseItems = [
    { id: 1, type: "knife", src: "/knife.png", color: "gray" }, // Kéo
    { id: 2, type: "scissors", src: "/scissors.png", color: "gray" }, // Búa
    { id: 3, type: "special", src: "/special.png", color: "yellow" }, // Special (sao)
  ];

  // Dữ liệu giả lập cho người đặt cược
  const bets = {
    knife: [
      { user: "ännäläki", amount: 15.2, level: 34 },
      { user: "Hugol", amount: 10.0, level: 81 },
      { user: "killer i destroy you", amount: 10.0, level: 37 },
      { user: "SUPERNOVA", amount: 8.14, level: 35 },
      { user: "Rashash", amount: 7.5, level: 33 },
      { user: "Filip2244", amount: 3.33, level: 23 },
      { user: "benc", amount: 0.65, level: 40 },
    ],
    wrench: [
      { user: "Platypus Razzler", amount: 12.0, level: 49 },
      { user: "INFINITE", amount: 11.4, level: 38 },
      { user: "Lol12345", amount: 8.52, level: 42 },
      { user: "Hugol", amount: 6.0, level: 81 },
      { user: "Compackt", amount: 5.0, level: 82 },
      { user: "killer i destroy you", amount: 4.0, level: 37 },
      { user: "Sagu", amount: 4.0, level: 51 },
    ],
    special: [
      { user: "FUNNNNNN", amount: 25.0, level: 82 },
      { user: "DRAAx1", amount: 9.0, level: 80 },
      { user: "Patrikss", amount: 4.52, level: 58 },
      { user: "Elkuz", amount: 4.0, level: 42 },
      { user: "russianGuy23", amount: 2.0, level: 17 },
      { user: "BaoBao", amount: 2.0, level: 89 },
      { user: "MILFBÄZER", amount: 2.0, level: 21 },
    ],
  };

  // Tính tổng cược cho từng loại
  const totalBets = {
    knife: bets.knife.reduce((sum, bet) => sum + bet.amount, 0).toFixed(2),
    wrench: bets.wrench.reduce((sum, bet) => sum + bet.amount, 0).toFixed(2),
    special: bets.special.reduce((sum, bet) => sum + bet.amount, 0).toFixed(2),
  };

  // Tạo mảng items lặp lại với Knife/Wrench xen kẽ, và Special xuất hiện sau mỗi 5 cặp
  const createInitialItems = () => {
    const items = [];
    const totalItems = 50; // Tổng số item trong roulette

    for (let i = 0; i < totalItems; i++) {
      // Xác định vị trí để chèn Special: sau mỗi 10 item (5 Knife + 5 Wrench)
      const specialInterval = 10; // Mỗi 10 item có 1 Special
      if (i > 0 && i % specialInterval === 0) {
        items.push(baseItems[2]); // Thêm Special
      } else {
        // Xen kẽ Knife và Wrench theo thứ tự cố định: Knife, Wrench, Knife, Wrench, ...
        items.push(baseItems[i % 2]); // 0: Knife, 1: Wrench
      }
    }

    // Đảm bảo tổng số item là 50
    while (items.length < totalItems) {
      items.push(baseItems[items.length % 2]); // Thêm Knife/Wrench xen kẽ để đủ 50
    }

    return items.slice(0, 50); // Cắt ngắn hoặc giữ lại 50 item
  };

  const [items, setItems] = useState(createInitialItems());

  useEffect(() => {
    let timer;
    if (countdown > 0 && !isRolling) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          const newValue = prev - 0.01; // Giảm 0.01 mỗi 10ms
          return Number(newValue.toFixed(2)); // Giữ 2 số thập phân
        });
      }, 10); // Cập nhật mỗi 10ms để tạo hiệu ứng mượt
    } else if (countdown <= 0 && !isRolling) {
      setCountdown(0); // Đảm bảo countdown không âm
      startRoll();
    }
    return () => clearInterval(timer);
  }, [countdown, isRolling]);

  const startRoll = () => {
    setIsRolling(true);
    // Tạo lại mảng items với Special xuất hiện sau mỗi 10 item
    const newItems = createInitialItems(); // Sử dụng lại logic tạo items ban đầu
    setItems(newItems);

    // Chọn ngẫu nhiên một vị trí dừng, tránh lặp lại vị trí của lần trước
    let randomStop;
    do {
      randomStop = Math.floor(Math.random() * 31) + 10; // Random từ 10 đến 40 (khoảng rộng hơn để tăng ngẫu nhiên)
    } while (randomStop === lastStopPosition); // Đảm bảo không trùng với vị trí dừng trước đó

    setLastStopPosition(randomStop); // Lưu vị trí dừng hiện tại
    const rollResult = newItems[randomStop];
    setResult(rollResult);

    // Cập nhật lịch sử các lần quay trước (giữ 5 lần gần nhất)
    setPreviousRolls((prev) => {
      const newRolls = [rollResult, ...prev].slice(0, 5); // Giữ 5 rolls gần nhất
      return newRolls;
    });

    // Random thời gian quay từ 5.00s đến 7.00s
    const rollDuration = 5 + Math.random() * 2; // Random từ 5 đến 7 giây
    const rollDurationMs = rollDuration * 1000; // Chuyển sang mili giây

    // Reset sau khi quay xong với thời gian ngẫu nhiên
    setTimeout(() => {
      setIsRolling(false);
      setCountdown(10.0); // Reset countdown về 10.00
    }, rollDurationMs);

    // Cập nhật animation với thời gian quay ngẫu nhiên
    const animation = {
      x: "-80%",
      transition: {
        type: "tween",
        duration: rollDuration, // Sử dụng thời gian quay ngẫu nhiên
        ease: [0.25, 0.1, 0.25, 1],
      },
    };

    // Áp dụng animation cho motion.div
    const rouletteElement = document.querySelector(".roulette-motion");
    if (rouletteElement) {
      rouletteElement.animate(
        [{ transform: "translateX(0%)" }, { transform: "translateX(-80%)" }],
        {
          duration: rollDurationMs,
          easing: "ease-out",
          fill: "forwards",
        }
      );
    }
  };

  // Hàm xử lý thay đổi số tiền cược
  const handleBetChange = (value) => {
    setBetAmount((prev) => {
      let newAmount = prev + value;
      if (newAmount < 0) newAmount = 0;
      return Number(newAmount.toFixed(2));
    });
  };

  // Hàm đặt cược (chỉ là ví dụ, cần logic thực tế)
  const placeBet = (type) => {
    console.log(`Placed bet on ${type} with amount: ${betAmount}`);
    // Thêm logic thực tế để cập nhật bets hoặc gửi dữ liệu đến server
  };

  return (
    <div className="mt-16 p-4 text-white" style={{ marginLeft: marginLeft }}>
      <div className="flex bg-gray-900 p-6 h-full text-white">
        {/* Main Content */}
        <div className="flex-1">
          {/* Roulette Section */}
          <div className="relative flex justify-center items-center">
            <div className="relative flex bg-gray-900 p-4 border border-gray-700 rounded-lg w-full max-w-4xl overflow-hidden">
              <motion.div
                className="flex gap-4 roulette-motion"
                initial={{ x: "0%" }}
                animate={{
                  x: isRolling ? "-80%" : "0%",
                }}
                transition={{
                  type: "tween",
                  duration: isRolling ? 5 + Math.random() * 2 : 0, // Random từ 5 đến 7 giây khi quay
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center rounded-full w-[100px] h-[100px]"
                    style={{ backgroundColor: item.color }}
                  >
                    <Image
                      src={item.src}
                      alt={item.type}
                      width={80}
                      height={80}
                    />
                  </div>
                ))}
              </motion.div>
              <div className="top-0 left-1/2 absolute bg-white w-[4px] h-full -translate-x-1/2 transform" />
            </div>

            {isRolling ? (
              <div className="top-1/2 left-1/2 absolute bg-black bg-opacity-70 px-4 py-2 rounded-full font-bold text-yellow-400 text-2xl -translate-x-1/2 -translate-y-1/2 transform">
                <p>ROLLING</p>
                <span>{countdown.toFixed(2)}</span>
              </div>
            ) : countdown > 0 ? (
              <div className="top-1/2 left-1/2 absolute bg-black bg-opacity-70 px-4 py-2 rounded-full font-bold text-white text-2xl -translate-x-1/2 -translate-y-1/2 transform">
                <p>STARTING IN</p>
                <span>{countdown.toFixed(2)}</span>
              </div>
            ) : null}
          </div>

          {/* Previous Rolls Section */}
          <div className="bg-gray-800 mt-4 p-2 border border-gray-700 rounded-lg">
            <p className="text-gray-300 text-sm">PREVIOUS ROLLS</p>
            <div className="flex justify-center gap-2 mt-2">
              {previousRolls.map((roll, index) => (
                <Image
                  key={index}
                  src={roll.src}
                  alt={roll.type}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ))}
            </div>
            <p className="flex items-center gap-1 mt-2 text-gray-300 text-sm">
              LAST 100:{" "}
              <Image src="/knife.png" alt="knife" width={20} height={20} />
              46
              <Image
                src="/scissors.png"
                alt="scissors"
                width={20}
                height={20}
              />
              48
              <Image src="/special.png" alt="special" width={20} height={20} />6
            </p>
          </div>

          {/* Bet Input Section */}
          <div className="bg-gray-800 mt-4 p-2 border border-gray-700 rounded-lg">
            <div className="flex justify-center items-center gap-2 w-full">
              <div className="relative w-72">
                <div className="top-1/2 left-2 absolute text-yellow-400 -translate-y-1/2">
                  <HandCoins className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(Number(e.target.value) || 0)}
                  placeholder="Enter bet amount..."
                  className="bg-gray-700 p-2 px-7 pr-10 rounded outline-none w-full text-yellow-400 appearance-none"
                  step="0.01"
                  min="0"
                />
                <button
                  onClick={() => setBetAmount(0)}
                  className="top-1/2 right-2 absolute text-gray-400 hover:text-white text-xs -translate-y-1/2 transform"
                >
                  CLEAR
                </button>
              </div>

              <button
                onClick={() => handleBetChange(0.01)}
                className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-yellow-400"
              >
                +0.01
              </button>
              <button
                onClick={() => handleBetChange(0.1)}
                className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-yellow-400"
              >
                +0.1
              </button>
              <button
                onClick={() => handleBetChange(1)}
                className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-yellow-400"
              >
                +1
              </button>
              <button
                onClick={() => handleBetChange(10)}
                className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-yellow-400"
              >
                +10
              </button>
              <button
                onClick={() => handleBetChange(100)}
                className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-yellow-400"
              >
                +100
              </button>
              <button
                onClick={() => handleBetChange(-betAmount / 2)}
                className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-yellow-400"
              >
                1/2
              </button>
              <button
                onClick={() => handleBetChange(betAmount)}
                className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-yellow-400"
              >
                x2
              </button>
              <button
                // onClick={() => handleBetChange(...)} // Thêm logic xử lý MAX
                className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-yellow-400"
              >
                MAX
              </button>
            </div>
          </div>

          {/* Betting and Results Section */}
          <div className="gap-4 grid grid-cols-3 mt-6 h-[447px]">
            {/* Knife Bet Section */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 border border-gray-700 rounded-lg h-">
              {/* Nút PLACE BET */}
              <button
                onClick={() => placeBet("knife")}
                className="flex justify-between items-center bg-[#1A1D21] hover:bg-[#23272C] shadow-inner px-4 py-3 border border-gray-600 rounded-lg w-full h-16 text-blue-300 text-lg"
              >
                <div className="flex items-center">
                  <Image
                    src="/knife.png"
                    alt="Knife"
                    width={28}
                    height={28}
                    className="opacity-80 mr-3"
                  />
                  <span className="font-semibold">PLACE BET</span>
                </div>
                <span className="font-semibold text-gray-400">WIN 2x</span>
              </button>

              {/* Tổng số cược */}
              <div className="flex justify-between mt-2">
                <p className="mt-2 text-gray-400 text-sm">13 Bets Total</p>
                <div className="flex items-center font-bold text-yellow-400 text-lg">
                  <Coins className="mr-1 w-4 h-4" />
                  51.90
                </div>
              </div>

              {/* Danh sách cược */}
              <div className="mt-2 h-40 overflow-hidden">
                {bets.knife.map((bet, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-1 text-gray-300 text-sm"
                  >
                    <span className="flex items-center">
                      <Image
                        src="/user-icon.png"
                        alt="User"
                        width={16}
                        height={16}
                        className="opacity-80 mr-1"
                      />
                      {bet.user}{" "}
                    </span>
                    <span className="text-gray-400">
                      {bet.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Bet Section */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 border border-gray-700 rounded-lg h-">
              <button
                onClick={() => placeBet("wrench")}
                className="flex justify-between items-center bg-[#1A1D21] hover:bg-[#23272C] shadow-inner px-4 py-3 border border-gray-600 rounded-lg w-full h-16 text-yellow-400 text-lg"
              >
                <div className="flex items-center">
                  <Image
                    src="/special.png"
                    alt="special"
                    width={28}
                    height={28}
                    className="opacity-80 mr-3"
                  />
                  <span className="font-semibold text-yellow-300">
                    PLACE BET
                  </span>
                </div>
                <span className="font-semibold text-gray-400">WIN 14x</span>
              </button>

              <div className="flex justify-between mt-2">
                <p className="mt-2 text-gray-400 text-sm">13 Bets Total</p>
                <div className="flex items-center font-bold text-yellow-400 text-lg">
                  <Coins className="mr-1 w-4 h-4" />
                  51.90
                </div>
              </div>

              <div className="mt-2 h-40 overflow-hidden">
                {bets.wrench.map((bet, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-1 text-gray-300 text-sm"
                  >
                    <span className="flex items-center">
                      <Image
                        src="/user-icon.png"
                        alt="User"
                        width={16}
                        height={16}
                        className="opacity-80 mr-1"
                      />
                      {bet.user}{" "}
                    </span>
                    <span className="text-gray-400">
                      {bet.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scissors Bet Section */}
            <div className="bg-gradient-to-tr from-gray-800 to-gray-900 p-4 border border-gray-700 rounded-lg h-">
              <button
                onClick={() => placeBet("special")}
                className="flex justify-between items-center bg-[#1A1D21] hover:bg-[#23272C] shadow-inner px-4 py-3 border border-gray-600 rounded-lg w-full h-16 text-yellow-400 text-lg"
              >
                <div className="flex items-center">
                  <Image
                    src="/scissors.png"
                    alt="scissors"
                    width={28}
                    height={28}
                    className="opacity-80 mr-3"
                  />
                  <span className="font-semibold text-orange-400">
                    PLACE BET
                  </span>
                </div>
                <span className="font-semibold text-gray-400">WIN 2x</span>
              </button>

              <div className="flex justify-between mt-2">
                <p className="mt-2 text-gray-400 text-sm">13 Bets Total</p>
                <div className="flex items-center font-bold text-yellow-400 text-lg">
                  <Coins className="mr-1 w-4 h-4" />
                  51.90
                </div>
              </div>

              <div className="mt-2 h-40 overflow-hidden">
                {bets.special.map((bet, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-1 text-gray-300 text-sm"
                  >
                    <span className="flex items-center">
                      <Image
                        src="/user-icon.png"
                        alt="User"
                        width={16}
                        height={16}
                        className="opacity-80 mr-1"
                      />
                      {bet.user}{" "}
                    </span>
                    <span className="text-gray-400">
                      {bet.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Section - Moved to the far right */}
        <div className="bg-gray-800 ml-4 p-4 border border-gray-700 rounded-lg w-64">
          <div className="mb-2 font-semibold text-lg">Chat</div>
          <div className="bg-gray-700 p-2 rounded h-[calc(100%-15%)] overflow-y-auto">
            {["User1: Hello!", "User2: Good luck!"].map((msg, idx) => (
              <div key={idx} className="text-gray-300 text-sm">
                {msg}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            className="bg-gray-600 mt-2 p-2 rounded w-full text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default RoulettePage;

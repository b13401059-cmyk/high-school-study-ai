import React, { useState, useEffect } from 'react';

// --- 工具：LocalStorage (讓瀏覽器記住資料) ---
const useStickyState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

// --- 組件：首頁 (Home) ---
const Home = ({ setTab }) => (
  <div className="text-center py-12 px-4 animate-in fade-in duration-700">
    <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-4 tracking-tight">
      高中生備考<span className="text-indigo-600">戰情室</span>
    </h1>
    <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto">
      你的數位軍師。不依賴網路，資料存本機。
      <br />
      包含情緒急診、專注作戰與進度存摺。
    </p>
    
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <DashboardCard 
        emoji="🚑" 
        title="情緒急診室" 
        desc="擴充至 9 種心理狀態診斷" 
        color="bg-rose-50 border-rose-500 text-rose-700"
        onClick={() => setTab('Life')} 
      />
      <DashboardCard 
        emoji="⏱️" 
        title="專注作戰區" 
        desc="大考倒數 + 番茄鐘 + 待辦" 
        color="bg-indigo-50 border-indigo-500 text-indigo-700"
        onClick={() => setTab('Study')} 
      />
      <DashboardCard 
        emoji="📈" 
        title="進度存摺" 
        desc="累積連續堅持天數 (Streak)" 
        color="bg-emerald-50 border-emerald-500 text-emerald-700"
        onClick={() => setTab('Goals')} 
      />
    </div>
  </div>
);

const DashboardCard = ({ emoji, title, desc, color, onClick }) => (
  <button onClick={onClick} className={`p-8 rounded-3xl border-b-8 shadow-sm hover:-translate-y-2 transition-all text-left group ${color} bg-opacity-50`}>
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{emoji}</div>
    <h3 className="font-bold text-2xl mb-2">{title}</h3>
    <p className="text-sm opacity-80 font-medium">{desc}</p>
  </button>
);

// --- 組件：情緒急診室 (Life) - 旗艦版 ---
const LifePage = () => {
  const [selectedState, setSelectedState] = useState(null);

  const prescriptions = {
    "焦慮": {
      icon: "🌪️",
      title: "4-7-8 呼吸法 (大腦降溫)",
      content: "焦慮會讓大腦過熱。透過強迫調節呼吸，欺騙副交感神經「現在很安全」。\n\n1. 用鼻子吸氣 4 秒\n2. 憋氣 7 秒\n3. 用嘴巴緩慢吐氣 8 秒",
      action: "閉上眼，跟著做 4 個循環。"
    },
    "疲憊": {
      icon: "🔋",
      title: "20分鐘強力小睡 (Power Nap)",
      content: "大腦的腺苷堆積過多，硬讀效率是零。你需要「系統重啟」。\n\n設定 20 分鐘鬧鐘（超過 30 分鐘會進入深層睡眠，醒來更累）。",
      action: "趴下，手機開飛航，鬧鐘設好。"
    },
    "拖延": {
      icon: "🐢",
      title: "5分鐘起步法 (啟動儀式)",
      content: "大腦抗拒的不是「讀書」，而是「開始讀書的痛苦」。\n\n騙大腦說：「我只讀 5 分鐘，5 分鐘後如果不爽就停下來。」通常開始了就不會停。",
      action: "拿出課本，計時 5 分鐘，現在開始。"
    },
    "迷茫": {
      icon: "🌫️",
      title: "自由書寫 (腦袋清倉)",
      content: "迷茫是因為腦中資訊過載。拿一張紙，不停筆地寫下所有念頭，不要管字醜、邏輯、文法。\n\n把垃圾倒出來，你才能看清路。",
      action: "拿出一張白紙，寫滿它。"
    },
    "崩潰": {
      icon: "💥",
      title: "5-4-3-2-1 著陸練習 (Grounding)",
      content: "當情緒快要淹沒你時，用感官把自己拉回現實：\n\n👀 看 5 個東西\n✋ 摸 4 個東西\n👂 聽 3 個聲音\n👃 聞 2 個味道\n👅 嚐 1 個味道",
      action: "深呼吸，先找出眼前 5 個顏色的東西。"
    },
    "嫉妒": {
      icon: "👀",
      title: "賽道分離 (Lane Switching)",
      content: "你在看別人的考卷，所以沒時間寫自己的。\n\n嫉妒是「想要進步」的扭曲訊號。別人的成功不會減少你的分數，你們在不同的賽道。",
      action: "寫下一個你今天比昨天進步的小地方。"
    },
    "自卑": {
      icon: "📉",
      title: "勝利日記 (Victory Log)",
      content: "大腦天生有「負面偏誤」，容易忘記你的成就。\n\n你需要手動存檔你的優點。不需要考滿分才算勝利，有起床也是勝利。",
      action: "翻開日記，寫下 3 件這週你做得很棒的小事。"
    },
    "失眠": {
      icon: "🌙",
      title: "身體掃描 (Body Scan)",
      content: "睡不著是因為身體還是緊繃的。\n\n想像一道光，從腳趾尖開始慢慢往上掃描，光經過的地方就放鬆肌肉。腳趾...腳踝...小腿...膝蓋...",
      action: "躺好，從放鬆你的腳指頭開始。"
    },
    "憤怒": {
      icon: "🔥",
      title: "燃燒書寫 (Write & Burn)",
      content: "憤怒是很有能量的情緒，不要壓抑，要釋放。\n\n把讓你生氣的事全部寫下來，用最髒的字眼也沒關係。寫完後，把那張紙撕碎或揉爛丟掉。",
      action: "寫下來，然後用力撕碎它！"
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">🚑 情緒急診室：你現在感覺如何？</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(prescriptions).map(([key, data]) => (
            <button 
              key={key} 
              onClick={() => setSelectedState(key)}
              className={`py-4 px-2 rounded-2xl font-bold transition-all border-2 flex items-center justify-center gap-2 ${selectedState === key ? 'bg-rose-500 border-rose-500 text-white shadow-lg scale-105' : 'bg-white border-slate-100 text-slate-600 hover:border-rose-200 hover:bg-rose-50'}`}
            >
              <span>{data.icon}</span>
              <span>{key}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedState && (
        <div className="bg-rose-50 p-8 rounded-3xl border-l-8 border-rose-500 animate-in slide-in-from-bottom-4 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{prescriptions[selectedState].icon}</span>
            <h3 className="text-2xl font-bold text-rose-800">{prescriptions[selectedState].title}</h3>
          </div>
          <p className="text-lg text-slate-700 whitespace-pre-line mb-8 leading-relaxed font-medium">
            {prescriptions[selectedState].content}
          </p>
          <div className="bg-white p-6 rounded-2xl text-center shadow-sm border border-rose-100">
            <p className="text-sm text-slate-400 mb-2 uppercase tracking-wide font-bold">Action Plan</p>
            <p className="text-xl font-bold text-rose-600">
              💡 {prescriptions[selectedState].action}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// --- 組件：專注作戰區 (Study) ---
const StudyPage = () => {
  const [examName, setExamName] = useStickyState("學測/分科", "examName");
  const [examDate, setExamDate] = useStickyState("", "examDate");
  const [todos, setTodos] = useStickyState([], "studyTodos");
  const [input, setInput] = useState("");
  
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("work");

  const getDaysLeft = () => {
    if (!examDate) return "---";
    const diff = new Date(examDate) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      const nextMode = mode === 'work' ? 'break' : 'work';
      setMode(nextMode);
      setTimeLeft(nextMode === 'work' ? 25 * 60 : 5 * 60);
      alert(mode === 'work' ? "專注結束！休息 5 分鐘！" : "休息結束！回到書桌！");
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const addTodo = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, done: false }]);
      setInput("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 px-4">
      <div className="space-y-6">
        <div className="bg-indigo-600 text-white p-6 rounded-3xl shadow-lg">
          <div className="flex justify-between items-start mb-2 opacity-80">
            <input 
              value={examName} 
              onChange={(e) => setExamName(e.target.value)}
              className="bg-transparent border-b border-white/30 outline-none w-32 placeholder-white/50 font-bold"
              placeholder="輸入考試名稱"
            />
            <span className="text-xs border border-white/30 px-2 py-1 rounded">倒數計時</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black tracking-tighter">{getDaysLeft()}</span>
            <span className="text-xl">天</span>
          </div>
          <input 
            type="date" 
            value={examDate} 
            onChange={(e) => setExamDate(e.target.value)}
            className="mt-4 bg-white/20 text-white px-3 py-1 rounded-lg text-sm w-full outline-none cursor-pointer" 
          />
        </div>

        <div className={`p-8 rounded-3xl shadow-sm border transition-colors ${mode === 'work' ? 'bg-white border-indigo-100' : 'bg-emerald-50 border-emerald-200'}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-slate-700">{mode === 'work' ? '🔥 深度專注' : '☕ 休息時間'}</h3>
            <div className="text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-500">{mode === 'work' ? '25 min' : '5 min'}</div>
          </div>
          <div className="text-7xl font-mono font-bold text-center mb-8 text-slate-800 tracking-wider">
            {formatTime(timeLeft)}
          </div>
          <div className="flex gap-4 justify-center">
            <button onClick={() => setIsActive(!isActive)} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition w-32 shadow-lg hover:shadow-xl">
              {isActive ? "暫停" : "開始"}
            </button>
            <button onClick={() => { setIsActive(false); setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60); }} className="bg-slate-100 text-slate-500 px-6 py-3 rounded-full font-bold hover:bg-slate-200 transition">
              重置
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 h-full flex flex-col">
        <h3 className="text-xl font-bold mb-4 text-slate-700">📝 今日作戰清單</h3>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={addTodo}
          className="w-full bg-slate-50 p-4 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
          placeholder="輸入任務後按 Enter (例：數學 3-1 習題)..."
        />
        <div className="space-y-3 overflow-y-auto flex-1 max-h-[400px]">
          {todos.length === 0 && <div className="text-center text-slate-400 py-10">尚無任務，好好規劃這一天！</div>}
          {todos.map(todo => (
            <div key={todo.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl group transition-all">
              <input 
                type="checkbox" 
                checked={todo.done} 
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 accent-indigo-600 cursor-pointer" 
              />
              <span className={`flex-1 ${todo.done ? 'line-through text-slate-400' : 'text-slate-700'}`}>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)} className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 組件：進度存摺 (Goals) ---
const GoalsPage = () => {
  const [goals, setGoals] = useStickyState([], "myGoals");
  const [newGoal, setNewGoal] = useState("");

  const addGoal = () => {
    if (!newGoal.trim()) return;
    setGoals([...goals, { id: Date.now(), title: newGoal, streak: 0, lastDate: null }]);
    setNewGoal("");
  };

  const checkIn = (id) => {
    const today = new Date().toDateString();
    setGoals(goals.map(g => {
      if (g.id === id && g.lastDate !== today) {
        return { ...g, streak: g.streak + 1, lastDate: today };
      }
      return g;
    }));
  };

  const deleteGoal = (id) => {
    if(window.confirm("確定刪除？")) setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 mb-8 text-center">
        <h2 className="text-2xl font-bold text-emerald-800 mb-2">📈 技能進度存摺</h2>
        <p className="text-emerald-600 mb-6 text-sm">每天打卡累積「連續天數」，看見自己的堅持。</p>
        <div className="flex gap-2 max-w-lg mx-auto">
          <input 
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-emerald-300"
            placeholder="輸入目標 (例：背 30 個單字)..."
          />
          <button onClick={addGoal} className="bg-emerald-600 text-white px-6 rounded-xl font-bold hover:bg-emerald-700 transition">新增</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {goals.map(goal => {
          const isDoneToday = goal.lastDate === new Date().toDateString();
          return (
            <div key={goal.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-48 relative group hover:shadow-md transition">
              <button onClick={() => deleteGoal(goal.id)} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition">🗑️</button>
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-1">{goal.title}</h3>
                <p className="text-xs text-slate-400">上次打卡：{goal.lastDate || "尚未開始"}</p>
              </div>
              <div className="text-center my-2">
                <div className="text-4xl font-black text-emerald-600 font-mono">{goal.streak}</div>
                <div className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Days Streak</div>
              </div>
              <button onClick={() => checkIn(goal.id)} disabled={isDoneToday} className={`w-full py-2 rounded-xl font-bold transition-all ${isDoneToday ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
                {isDoneToday ? "✅ 今日已完成" : "🔥 立即打卡"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- 主程式 ---
export default function App() {
  const [tab, setTab] = useState('Home');
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-10">
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 border-b flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-800 cursor-pointer flex items-center gap-2" onClick={()=>setTab('Home')}>
          <span className="bg-indigo-600 text-white w-8 h-8 flex items-center justify-center rounded-lg text-sm">H</span>
          Study Station
        </h1>
        <div className="flex bg-slate-100 p-1 rounded-full overflow-x-auto">
          {['Home', 'Life', 'Study', 'Goals'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${tab === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
              {t === 'Home' ? '首頁' : t === 'Life' ? '急診室' : t === 'Study' ? '作戰區' : '存摺'}
            </button>
          ))}
        </div>
      </nav>
      <main className="pt-8">
        {tab === 'Home' && <Home setTab={setTab} />}
        {tab === 'Life' && <LifePage />}
        {tab === 'Study' && <StudyPage />}
        {tab === 'Goals' && <GoalsPage />}
      </main>
    </div>
  );
}
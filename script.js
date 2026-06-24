// Premium GitHub Profile Dashboard Logic
// Architected for Boddeti Veera Durga Murali

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initFloatingCode();
  initStatsCounter();
  initNeuralNetwork();
  initContributionHeatmap();
});

/* ==========================================================================
   1. System Clock
   ========================================================================== */
function initClock() {
  const clockElement = document.getElementById('live-time');
  if (!clockElement) return;

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `SYS_TIME: ${hours}:${minutes}:${seconds}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   2. Floating Code Snippets Background
   ========================================================================== */
function initFloatingCode() {
  const container = document.getElementById('floating-code-container');
  if (!container) return;

  const codeSnippets = [
    'import tensorflow as tf',
    'from langchain.agents import AgentExecutor',
    'model = AutoModelForCausalLM.from_pretrained()',
    'db.similarity_search(query, k=5)',
    'class RAGPipeline(BaseRetriever):',
    'def execute_agentic_flow(state):',
    'latency = "12ms" | accuracy = 94.6%',
    'docker build -t bvd-murali/ai-service:latest .',
    'azure_openai.get_chat_completion(messages)',
    'vector_store.add_documents(documents)',
    'def fine_tune_llm(dataset, epochs=3):',
    'await agent.ainvoke({"input": task})',
    ' CosmosDBClient.get_database_client()',
    'optimizer = tf.keras.optimizers.Adam(learning_rate=1e-5)',
    'outputs = model.generate(**inputs, max_new_tokens=512)'
  ];

  const maxSnippets = 10;
  
  for (let i = 0; i < maxSnippets; i++) {
    createSnippet(container, codeSnippets, true);
  }

  function createSnippet(parent, list, initial = false) {
    const text = list[Math.floor(Math.random() * list.length)];
    const el = document.createElement('div');
    el.className = 'floating-code';
    el.textContent = text;

    // Randomize initial placement and animations
    const xPos = Math.random() * 100; // horizontal percentage
    const yPos = initial ? Math.random() * 100 : 105; // vertical start percentage
    const duration = 20 + Math.random() * 20; // 20s to 40s
    const delay = initial ? -Math.random() * duration : 0; // spread initial start times
    const fontSize = 8 + Math.floor(Math.random() * 5); // 8px to 12px
    const opacity = 0.02 + Math.random() * 0.04; // subtle alpha

    el.style.left = `${xPos}%`;
    el.style.top = `${yPos}%`;
    el.style.fontSize = `${fontSize}px`;
    el.style.opacity = opacity;
    el.style.animation = `floatCode ${duration}s linear infinite`;
    el.style.animationDelay = `${delay}s`;

    parent.appendChild(el);

    // Recycle elements after they drift off screen
    setTimeout(() => {
      el.remove();
      createSnippet(parent, list, false);
    }, (duration + (initial ? delay : 0)) * 1000);
  }
}

/* ==========================================================================
   3. Statistics Incrementing Counter
   ========================================================================== */
function initStatsCounter() {
  const statValues = document.querySelectorAll('.stat-value');
  
  statValues.forEach(valueElement => {
    const target = parseInt(valueElement.getAttribute('data-target'), 10);
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quadratic function
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * target);
      
      valueElement.textContent = currentValue.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        valueElement.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

/* ==========================================================================
   4. Neural Network Canvas Simulator (Interactive)
   ========================================================================== */
function initNeuralNetwork() {
  const canvas = document.getElementById('neural-net-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const parent = canvas.parentElement;
  
  let width = canvas.width = parent.clientWidth;
  let height = canvas.height = parent.clientHeight;
  
  let nodes = [];
  const maxNodes = 40;
  const connectionDistance = 120;
  
  const mouse = {
    x: null,
    y: null,
    radius: 150
  };

  // Resize listener
  window.addEventListener('resize', () => {
    width = canvas.width = parent.clientWidth;
    height = canvas.height = parent.clientHeight;
  });

  // Track mouse coordinates over the card panel
  parent.addEventListener('mousemove', (e) => {
    const rect = parent.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  parent.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Node class definition
  class Node {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = 2 + Math.random() * 3;
      // Assign either a blue or violet primary tone
      this.color = Math.random() > 0.5 ? '56, 139, 253' : '188, 140, 255';
    }

    update() {
      // Bounds check and collision bounce
      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;
      
      this.x += this.vx;
      this.y += this.vy;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, 0.8)`;
      ctx.fill();
    }
  }

  // Populate network nodes
  for (let i = 0; i < maxNodes; i++) {
    nodes.push(new Node());
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw nodes
    nodes.forEach(node => {
      node.update();
      node.draw();
    });

    // Draw neural synapses (connections)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        
        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          
          // Gradient between connecting nodes' colors
          const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
          grad.addColorStop(0, `rgba(${nodes[i].color}, ${alpha})`);
          grad.addColorStop(1, `rgba(${nodes[j].color}, ${alpha})`);
          
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw synapse to mouse pointer if close enough
      if (mouse.x !== null && mouse.y !== null) {
        const mouseDist = Math.hypot(nodes[i].x - mouse.x, nodes[i].y - mouse.y);
        if (mouseDist < mouse.radius) {
          const alpha = (1 - mouseDist / mouse.radius) * 0.4;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 139, 253, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          
          // Highlight connection nodes near mouse
          ctx.beginPath();
          ctx.arc(nodes[i].x, nodes[i].y, nodes[i].radius + 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 139, 253, ${alpha * 0.5})`;
          ctx.fill();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   5. GitHub-style Contribution Heatmap Generator
   ========================================================================== */
function initContributionHeatmap() {
  const container = document.getElementById('heatmap-cells-container');
  const monthLabelsElement = document.getElementById('heatmap-months');
  const tooltip = document.getElementById('heatmap-tooltip');
  if (!container || !monthLabelsElement || !tooltip) return;

  // Setup Date Arrays (Go back 53 weeks)
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 371); // 53 weeks * 7 days = 371 days

  // Get start offset to align weekdays correctly
  const startDayOffset = startDate.getDay(); // 0: Sunday, 1: Monday, etc.
  
  // Adjust starting date back to the Sunday of that week
  startDate.setDate(startDate.getDate() - startDayOffset);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let monthLabelAllocations = [];
  let currentMonthName = '';

  // Generate 53 Columns for weeks
  for (let w = 0; w < 53; w++) {
    const weekCol = document.createElement('div');
    weekCol.className = 'heatmap-week-col';

    for (let d = 0; d < 7; d++) {
      const cellDate = new Date(startDate);
      cellDate.setDate(startDate.getDate() + (w * 7) + d);
      
      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';

      // Capture month transitions to position labels
      const cellMonth = months[cellDate.getMonth()];
      if (d === 0 && cellMonth !== currentMonthName) {
        currentMonthName = cellMonth;
        monthLabelAllocations.push({ weekIndex: w, label: cellMonth });
      }

      // Generate a realistic, simulated distribution of commits
      // Higher activity on weekdays (Mon-Fri) vs weekends (Sat-Sun)
      // Some sparse empty slots and highly active spikes
      const dayOfWeek = cellDate.getDay();
      let commitProbability = 0.75;
      if (dayOfWeek === 0 || dayOfWeek === 6) commitProbability = 0.25; // Weekend dip

      let commits = 0;
      if (Math.random() < commitProbability) {
        // High density random commits
        const base = Math.random();
        if (base < 0.4) commits = Math.floor(Math.random() * 2) + 1; // 1-2
        else if (base < 0.8) commits = Math.floor(Math.random() * 3) + 3; // 3-5
        else commits = Math.floor(Math.random() * 5) + 6; // 6-10
      }

      // Color coding level mapping
      let level = 0;
      if (commits === 0) level = 0;
      else if (commits <= 2) level = 1;
      else if (commits <= 4) level = 2;
      else if (commits <= 7) level = 3;
      else level = 4;

      cell.classList.add(`level-${level}`);
      cell.setAttribute('data-commits', commits);
      cell.setAttribute('data-date', formatDateString(cellDate));

      // Tooltip Event Handlers
      cell.addEventListener('mouseover', (e) => {
        const commitText = commits === 1 ? '1 commit' : `${commits} commits`;
        tooltip.textContent = `${commitText} on ${formatFriendlyDate(cellDate)}`;
        tooltip.style.display = 'block';
      });

      cell.addEventListener('mousemove', (e) => {
        tooltip.style.left = `${e.pageX}px`;
        tooltip.style.top = `${e.pageY}px`;
      });

      cell.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
      });

      weekCol.appendChild(cell);
    }
    
    container.appendChild(weekCol);
  }

  // Populate Month Labels at the top with spacing matching week alignments
  // Compute spacing
  monthLabelAllocations.forEach((item, idx) => {
    const labelSpan = document.createElement('span');
    labelSpan.textContent = item.label;
    
    // Position labels dynamically relative to their column index
    const percentWidth = (item.weekIndex / 53) * 100;
    labelSpan.style.left = `${percentWidth}%`;
    labelSpan.style.position = 'absolute';
    monthLabelsElement.appendChild(labelSpan);
  });
  
  // Make labels container relative so absolute spans position correctly
  monthLabelsElement.style.position = 'relative';
  monthLabelsElement.style.height = '14px';
}

function formatDateString(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatFriendlyDate(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

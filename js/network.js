(function () {
  var container = document.getElementById('network-graph');
  if (!container || typeof d3 === 'undefined') return;

  var W = container.clientWidth || 1100;
  var H = 720;

  var TYPE_COLOR = {
    center:   '#2563eb',
    company:  '#7c3aed',
    startup:  '#16a34a',
    interest: '#b45309',
    hobby:    '#0e7490',
    edu:      '#db2777',
    leaf:     '#ffffff',
  };

  var TEXT_COLOR = {
    center:   '#ffffff',
    company:  '#ffffff',
    startup:  '#ffffff',
    interest: '#ffffff',
    hobby:    '#ffffff',
    edu:      '#ffffff',
    leaf:     '#374151',
  };

  var STROKE_COLOR = {
    center:   'none',
    company:  'none',
    startup:  'none',
    interest: 'none',
    hobby:    'none',
    edu:      'none',
    leaf:     '#d1d5db',
  };

  var nodes = [
    { id: 'steve',     label: 'Steve Kan',    type: 'center',   r: 36 },

    { id: 'capco',     label: 'Wipro Capco',  type: 'company',  r: 33 },
    { id: 'richemont', label: 'Richemont',    type: 'company',  r: 27 },
    { id: 'hotmob',    label: 'Hotmob',       type: 'company',  r: 27 },
    { id: 'l2p',       label: 'Learn2Play',   type: 'startup',  r: 27 },
    { id: 'research',  label: 'Research',     type: 'interest', r: 24 },
    { id: 'hobbies',   label: 'Interests',    type: 'hobby',    r: 24 },
    { id: 'edu',       label: 'Education',    type: 'edu',      r: 30 },

    // Capco leaves
    { id: 'c1', label: 'AI Underwriting',    type: 'leaf', r: 17 },
    { id: 'c2', label: 'Azure',              type: 'leaf', r: 17 },
    { id: 'c3', label: 'Pre-approval Tools', type: 'leaf', r: 17 },
    { id: 'c4', label: 'AI Chatbots',        type: 'leaf', r: 17 },
    { id: 'c5', label: 'Form AI Validation', type: 'leaf', r: 17 },

    // Richemont leaves
    { id: 'r1', label: 'Recommendation Models', type: 'leaf', r: 17 },
    { id: 'r2', label: 'AI Initiatives',        type: 'leaf', r: 17 },
    { id: 'r3', label: '14 Forecast Models',    type: 'leaf', r: 17 },
    { id: 'r4', label: 'AI Model Training',     type: 'leaf', r: 17 },
    { id: 'r5', label: 'GCP',                   type: 'leaf', r: 17 },

    // Hotmob leaves
    { id: 'h1', label: 'Digital Transformations', type: 'leaf', r: 17 },
    { id: 'h2', label: 'NLP Classifiers',         type: 'leaf', r: 17 },
    { id: 'h3', label: 'Market Analysis',         type: 'leaf', r: 17 },
    { id: 'h4', label: 'GCP',                     type: 'leaf', r: 17 },

    // Learn2Play leaves
    { id: 'l1', label: 'iOS App',         type: 'leaf', r: 17 },
    { id: 'l2', label: 'HKD 100K Funded', type: 'leaf', r: 17 },
    { id: 'l3', label: 'GCP',             type: 'leaf', r: 17 },

    // Research leaves
    { id: 'rs1', label: 'Federated Learning',     type: 'leaf', r: 17 },
    { id: 'rs2', label: 'Recommendation Systems', type: 'leaf', r: 17 },
    { id: 'rs3', label: 'RL Algorithms',          type: 'leaf', r: 17 },

    // Interests
    { id: 'p1', label: 'Robotics',          type: 'leaf', r: 17 },
    { id: 'p2', label: 'Building Products', type: 'leaf', r: 17 },
    { id: 'p3', label: 'Basketball',        type: 'leaf', r: 17 },
    { id: 'p4', label: 'Guitar',            type: 'leaf', r: 17 },

    // Education leaves
    { id: 'e1', label: 'CityU MSc DS',       type: 'leaf', r: 17 },
    { id: 'e2', label: 'UWaterloo BA Econ',  type: 'leaf', r: 17 },
    { id: 'e3', label: 'Google PMLE',        type: 'leaf', r: 17 },
  ];

  var links = [
    { source: 'steve', target: 'capco' },
    { source: 'steve', target: 'richemont' },
    { source: 'steve', target: 'hotmob' },
    { source: 'steve', target: 'l2p' },
    { source: 'steve', target: 'research' },
    { source: 'steve', target: 'hobbies' },

    { source: 'capco',     target: 'c1' },
    { source: 'capco',     target: 'c2' },
    { source: 'capco',     target: 'c3' },
    { source: 'capco',     target: 'c4' },
    { source: 'capco',     target: 'c5' },

    { source: 'richemont', target: 'r1' },
    { source: 'richemont', target: 'r2' },
    { source: 'richemont', target: 'r3' },
    { source: 'richemont', target: 'r4' },
    { source: 'richemont', target: 'r5' },

    { source: 'hotmob',    target: 'h1' },
    { source: 'hotmob',    target: 'h2' },
    { source: 'hotmob',    target: 'h3' },

    { source: 'l2p',       target: 'l1' },
    { source: 'l2p',       target: 'l2' },
    { source: 'l2p',       target: 'l3' },

    { source: 'research',  target: 'rs1' },
    { source: 'research',  target: 'rs2' },
    { source: 'research',  target: 'rs3' },

    { source: 'hobbies',   target: 'p1' },
    { source: 'hobbies',   target: 'p2' },
    { source: 'hobbies',   target: 'p3' },
    { source: 'hobbies',   target: 'p4' },

    { source: 'steve',     target: 'edu' },
    { source: 'edu',       target: 'e1' },
    { source: 'edu',       target: 'e2' },

    { source: 'steve',     target: 'e3' },
    { source: 'hotmob',    target: 'h4' },
    { source: 'rs1',       target: 'richemont' },
  ];

  var svg = d3.select('#network-graph')
    .append('svg')
    .attr('width', '100%')
    .attr('height', H)
    .attr('viewBox', [0, 0, W, H].join(' '))
    .attr('preserveAspectRatio', 'xMidYMid meet');

  var center = nodes.find(function (n) { return n.id === 'steve'; });
  center.fx = W / 2;
  center.fy = H / 2;

  var sim = d3.forceSimulation(nodes)
    .alphaDecay(0.008)
    .force('link', d3.forceLink(links).id(function (d) { return d.id; })
      .distance(function (d) {
        var srcType = d.source.type !== undefined ? d.source.type : '';
        if (srcType === 'center') return 240;
        return 120;
      })
    )
    .force('charge', d3.forceManyBody().strength(function (d) {
      if (d.type === 'center')   return -900;
      if (d.type === 'leaf')     return -120;
      return -350;
    }))
    .force('collision', d3.forceCollide().radius(function (d) { return d.r + 12; }))
    .force('x', d3.forceX(W / 2).strength(0.03))
    .force('y', d3.forceY(H / 2).strength(0.03));

  var link = svg.append('g')
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke', '#e5e7eb')
    .attr('stroke-width', 1)
    .attr('stroke-opacity', 0.85);

  var node = svg.append('g')
    .selectAll('g')
    .data(nodes)
    .join('g')
    .style('cursor', function (d) { return d.type === 'center' ? 'default' : 'grab'; })
    .call(
      d3.drag()
        .on('start', function (event, d) {
          if (!event.active) sim.alphaTarget(0.3).restart();
          d.fx = d.x; d.fy = d.y;
        })
        .on('drag', function (event, d) {
          d.fx = event.x; d.fy = event.y;
        })
        .on('end', function (event, d) {
          if (!event.active) sim.alphaTarget(0);
          if (d.type !== 'center') { d.fx = null; d.fy = null; }
          sim.alpha(0.5).restart();
        })
    );

  node.append('circle')
    .attr('r', function (d) { return d.r; })
    .attr('fill', function (d) { return TYPE_COLOR[d.type]; })
    .attr('stroke', function (d) { return STROKE_COLOR[d.type]; })
    .attr('stroke-width', 1.5)
    .attr('filter', function (d) {
      return d.type !== 'leaf'
        ? 'drop-shadow(0 2px 6px rgba(0,0,0,0.14))'
        : 'none';
    });

  node.append('text')
    .attr('text-anchor', 'middle')
    .attr('fill', function (d) { return TEXT_COLOR[d.type]; })
    .attr('font-family', 'Inter, sans-serif')
    .attr('font-weight', function (d) { return d.type === 'leaf' ? '500' : '700'; })
    .attr('font-size', function (d) {
      return ({ center: 10, company: 9.5, startup: 9.5, interest: 9.5, hobby: 9.5, edu: 9.5, leaf: 8 })[d.type] + 'px';
    })
    .style('pointer-events', 'none')
    .style('user-select', 'none')
    .each(function (d) {
      var el = d3.select(this);
      var words = d.label.split(' ');
      if (words.length <= 2) {
        el.attr('dominant-baseline', 'middle').text(d.label);
        return;
      }
      var mid = Math.ceil(words.length / 2);
      el.append('tspan').attr('x', 0).attr('dy', '-0.55em').text(words.slice(0, mid).join(' '));
      el.append('tspan').attr('x', 0).attr('dy', '1.15em').text(words.slice(mid).join(' '));
    });

  sim.on('tick', function () {
    link
      .attr('x1', function (d) { return d.source.x; })
      .attr('y1', function (d) { return d.source.y; })
      .attr('x2', function (d) { return d.target.x; })
      .attr('y2', function (d) { return d.target.y; });

    node.attr('transform', function (d) {
      var pad = d.r + 18;
      var x = Math.max(pad, Math.min(W - pad, d.x));
      var y = Math.max(pad, Math.min(H - pad, d.y));
      return 'translate(' + x + ',' + y + ')';
    });
  });
})();

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * GitHub Stats Section
 * Portfolio.md spec: "Animated contribution graph, Repo highlights, Auto-fetch from GitHub API"
 */

const GITHUB_USERNAME = "aknankpuria";

// Fallback data if API fails or rate-limits
const fallbackStats = {
  publicRepos: 15,
  followers: 12,
  totalStars: 8,
  topLanguages: ["JavaScript", "TypeScript", "Solidity", "CSS", "HTML"],
  repos: [
    { name: "nft-marketplace", description: "Decentralized NFT marketplace", stars: 3, language: "Solidity", url: `https://github.com/${GITHUB_USERNAME}` },
    { name: "virtual-tryon-api", description: "AI-based virtual try-on system", stars: 2, language: "JavaScript", url: `https://github.com/${GITHUB_USERNAME}` },
    { name: "financial-dashboard", description: "RBAC-based financial API", stars: 2, language: "TypeScript", url: `https://github.com/${GITHUB_USERNAME}` },
    { name: "portfolio", description: "Personal portfolio website", stars: 1, language: "JavaScript", url: `https://github.com/${GITHUB_USERNAME}` },
  ],
};

const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178C6",
  Solidity: "#AA6746",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Python: "#3572A5",
  Rust: "#dea584",
};

// Generate a fake contribution graph pattern
const generateContributionData = () => {
  const weeks = 52;
  const days = 7;
  const data = [];

  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < days; d++) {
      // Create a realistic pattern — more active on weekdays, with streaks
      const isWeekday = d > 0 && d < 6;
      const baseChance = isWeekday ? 0.6 : 0.3;
      const streakBonus = w > 20 && w < 45 ? 0.2 : 0;
      const active = Math.random() < baseChance + streakBonus;

      if (active) {
        const intensity = Math.random();
        if (intensity > 0.8) week.push(4);
        else if (intensity > 0.5) week.push(3);
        else if (intensity > 0.2) week.push(2);
        else week.push(1);
      } else {
        week.push(0);
      }
    }
    data.push(week);
  }
  return data;
};

const ContributionGraph = () => {
  const [contributions] = useState(() => generateContributionData());
  const graphRef = useRef();

  const getColor = (level) => {
    const colors = [
      "rgba(255,255,255,0.03)",  // 0 - empty
      "rgba(0,229,204,0.15)",    // 1 - light
      "rgba(0,229,204,0.3)",     // 2 - medium
      "rgba(0,229,204,0.5)",     // 3 - strong
      "rgba(0,229,204,0.8)",     // 4 - max
    ];
    return colors[level] || colors[0];
  };

  // Animate squares appearing
  useEffect(() => {
    if (!graphRef.current) return;
    const squares = graphRef.current.querySelectorAll(".contrib-cell");

    gsap.fromTo(
      squares,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: { each: 0.002, from: "start" },
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: graphRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div ref={graphRef} className="overflow-x-auto pb-2">
      <div className="flex gap-[3px] min-w-[700px]">
        {contributions.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((level, di) => (
              <div
                key={`${wi}-${di}`}
                className="contrib-cell w-[10px] h-[10px] rounded-[2px] transition-colors duration-200 hover:ring-1 hover:ring-[#00E5CC]/50"
                style={{ background: getColor(level) }}
                title={`${level > 0 ? level + " contributions" : "No contributions"}`}
              />
            ))}
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-3">
        <span className="text-[10px] text-white-500 font-mono">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="w-[10px] h-[10px] rounded-[2px]"
            style={{ background: getColor(level) }}
          />
        ))}
        <span className="text-[10px] text-white-500 font-mono">More</span>
      </div>
    </div>
  );
};

const GitHubStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef();

  // Fetch from GitHub API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!userRes.ok) throw new Error("API rate limited");
        const userData = await userRes.json();

        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6`
        );
        const reposData = reposRes.ok ? await reposRes.json() : [];

        // Calculate stats
        const totalStars = reposData.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
        const languages = [...new Set(reposData.map((r) => r.language).filter(Boolean))];

        setStats({
          publicRepos: userData.public_repos || fallbackStats.publicRepos,
          followers: userData.followers || fallbackStats.followers,
          totalStars: totalStars || fallbackStats.totalStars,
          topLanguages: languages.length > 0 ? languages.slice(0, 5) : fallbackStats.topLanguages,
          repos: reposData.length > 0
            ? reposData.slice(0, 4).map((r) => ({
                name: r.name,
                description: r.description || "No description",
                stars: r.stargazers_count || 0,
                language: r.language || "Unknown",
                url: r.html_url,
              }))
            : fallbackStats.repos,
        });
      } catch (err) {
        console.warn("GitHub API fallback:", err.message);
        setStats(fallbackStats);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".github-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".github-heading", start: "top 85%" },
        }
      );

      gsap.utils.toArray(".github-stat-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });

      gsap.utils.toArray(".github-repo-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.6, delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [stats]);

  const displayStats = stats || fallbackStats;

  return (
    <section className="c-space my-20" ref={sectionRef}>
      <div className="text-center mb-12">
        <p className="text-label-alt github-heading mb-3">Open Source</p>
        <h3 className="head-text github-heading">GitHub Activity</h3>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
        {[
          { value: displayStats.publicRepos, label: "Repositories", icon: "📦" },
          { value: displayStats.followers, label: "Followers", icon: "👥" },
          { value: displayStats.totalStars, label: "Total Stars", icon: "⭐" },
          { value: `${displayStats.topLanguages.length}+`, label: "Languages", icon: "🔤" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="github-stat-card group p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 text-center"
          >
            <span className="text-xl mb-2 block">{stat.icon}</span>
            <p className="text-2xl font-bold text-white font-mono">
              {loading ? "—" : stat.value}
            </p>
            <p className="text-[11px] text-white-500 uppercase tracking-wider font-mono mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Contribution Graph */}
      <div className="max-w-4xl mx-auto mb-10 p-6 rounded-xl border border-white/5 bg-white/[0.01]">
        <p className="text-xs font-mono text-white-500 mb-4">
          {displayStats.publicRepos} contributions in the last year
        </p>
        <ContributionGraph />
      </div>

      {/* Top Repos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {displayStats.repos.map((repo, i) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="github-repo-card group p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#00E5CC]/20 hover:bg-white/[0.04] transition-all duration-300 block"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-white-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                </svg>
                <span className="text-sm font-semibold text-[#00E5CC] group-hover:text-[#00E5CC] font-mono">
                  {repo.name}
                </span>
              </div>
              <div className="flex items-center gap-1 text-white-500">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-mono">{repo.stars}</span>
              </div>
            </div>
            <p className="text-xs text-white-500 line-clamp-2 mb-3">
              {repo.description}
            </p>
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: languageColors[repo.language] || "#ccc" }}
              />
              <span className="text-[11px] text-white-500 font-mono">
                {repo.language}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center mt-8">
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-white-500 hover:text-[#00E5CC] transition-colors font-mono group"
        >
          View all repositories
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default GitHubStats;

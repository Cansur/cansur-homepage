import React, { useState, useEffect, useRef } from 'react';

// 북마크 그룹 데이터
const bookmarkGroups = [
    {
        title: "Main Sites",
        bookmarks: [
            { name: "Naver (네이버)", icon: "https://www.naver.com/favicon.ico", url: "https://www.naver.com/" },
            { name: "Google (구글)", icon: "bi-google", url: "https://www.google.com/" },
            { name: "YouTube (유튜브)", icon: "bi-youtube", url: "https://www.youtube.com/" },
            { name: "Github (깃허브)", icon: "bi-github", url: "https://github.com/" },
            { name: "Drive (드라이브)", icon: "bi-hdd", url: "https://mybox.naver.com/#/my" }
        ],
    },
    {
        title: "Development",
        bookmarks: [
            { name: "Github (me)", icon: "bi-github", url: "https://github.com/Cansur" },
            { name: "Bootstrap", icon: "bi-bootstrap", url: "https://getbootstrap.com/" },
            { name: "Bootstrap-icon", icon: "bi-bootstrap-fill", url: "https://icons.getbootstrap.com/" },
            { name: "Oracle Cloud", icon: "bi-cloud", url: "https://www.oracle.com/cloud/sign-in.html?redirect_uri=https%3A%2F%2Fcloud.oracle.com%2F%3Fregion%3Dap-chuncheon-1" },
            { name: "jSONPlaceholder", icon: "https://jsonplaceholder.typicode.com/favicon.ico", url: "https://jsonplaceholder.typicode.com/" },
        ],
    },
    {
        title: "한림대",
        bookmarks: [
            { name: "한림대 포털", icon: "bi-box2", url: "https://www.hallym.ac.kr/hallym_univ/sub02/cP11/cP10.html" },
            { name: "한림대 스마트리드", icon: "bi-box2", url: "https://smartlead.hallym.ac.kr/" },
            { name: "한림대 학생정보", icon: "bi-box2", url: "https://was1.hallym.ac.kr:8087/hlwc/mdi/Login.html" },
        ],
    },
    {
        title: "AI",
        bookmarks: [
            { name: "Chat gpt", icon: "https://chatgpt.com/favicon.ico", url: "https://chatgpt.com/" },
            { name: "Grok (그록)", icon: "bi-cpu", url: "https://grok.com/" },
            { name: "Gemini (지니)", icon: "bi-cpu", url: "https://gemini.google.com/" },
            { name: "Colab (코랩, My_File)", icon: "bi-cpu", url: "https://colab.research.google.com/drive/1ybT8fpuUtfKbMoRTC53mgQxaiSo7bmig" },
        ],
    },
    {
        title: "Study",
        bookmarks: [
            { name: "baekjoon (백준)", icon: "https://www.acmicpc.net/favicon.ico", url: "https://www.acmicpc.net/" },
            { name: "solved.ac (솔브드)", icon: "https://solved.ac/favicon.ico", url: "https://solved.ac/" },
            { name: "환산", icon: "bi-calculator", url: "https://maplescouter.com/" },
            { name: "POE Trade (거래소)", icon: "https://poe.game.daum.net/favicon.ico", url: "https://poe.game.daum.net/trade/search/Phrecia" },
            { name: "POE Ninja", icon: "bi-box2", url: "https://poe.ninja/economy/phrecia/currency" },
            { name: "POE Act", icon: "bi-box2", url: "http://poe.pe.kr/?act=1" },
            { name: "POE DB", icon: "https://poedb.tw/favicon.ico", url: "https://poedb.tw/kr/" },
            { name: "POE Craft", icon: "bi-box2", url: "https://www.craftofexile.com/?cl=kr" },
        ],
    },
    {
        title: "Investment",
        bookmarks: [
            { name: "Investing", icon: "https://www.investing.com/favicon.ico", url: "https://kr.investing.com/indices/nasdaq-composite" },
            { name: "Yahoo Finance", icon: "https://finance.yahoo.com/favicon.ico", url: "https://finance.yahoo.com/" },
        ],
    },
];

const Home = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState([]);
    const inputRef = useRef(null);
    const cardRefs = useRef([]); // 카드 refs 배열

    // const [noResultMessage, setNoResultMessage] = useState(false);

    // Ctrl + K 단축키
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                setFiltered([]);       // 결과 초기화
                setQuery("");          // 검색어 초기화
                setShowSearch(true);   // 검색창 열기
                setTimeout(() => inputRef.current?.focus(), 100);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // 검색 실행
    const handleSearch = (e) => {
        if (e.key === "Enter" && query.trim() !== "") {
            const allBookmarks = bookmarkGroups.flatMap(group => group.bookmarks);
            const results = allBookmarks.filter(b =>
                b.name.toLowerCase().includes(query.toLowerCase())
            );
            if (results.length === 0) {
                window.location.reload(); // 검색 결과가 없을 경우 페이지 새로고침
                // setNoResultMessage(true);
                // setTimeout(() => setNoResultMessage(false), 3000); // 3초 후 알림 사라짐
            }
            setFiltered(results);
            setShowSearch(false);
            setTimeout(() => {
                if (cardRefs.current[0]) cardRefs.current[0].focus();
            }, 100);
        }
        if (e.key === "Escape") {
            handleCloseSearch();
        }
    };

    // 검색창 닫기
    const handleCloseSearch = () => {
        setShowSearch(false);
        setQuery("");
        setFiltered([]);
    };

    // 렌더링 데이터 결정
    const renderGroups = filtered.length
        ? [{ title: `🔍 Search Results for "${query}"`, bookmarks: filtered }]
        : bookmarkGroups;

    // 카드 키보드 이동 핸들링
    const handleCardKeyDown = (e, index) => {
        const columns = 6; // row-cols-md-6와 일치하게 설정
        const total = cardRefs.current.length;

        if (e.key === "ArrowRight" && index + 1 < total) {
            cardRefs.current[index + 1]?.focus();
        }
        if (e.key === "ArrowLeft" && index - 1 >= 0) {
            cardRefs.current[index - 1]?.focus();
        }
        if (e.key === "ArrowDown" && index + columns < total) {
            cardRefs.current[index + columns]?.focus();
        }
        if (e.key === "ArrowUp" && index - columns >= 0) {
            cardRefs.current[index - columns]?.focus();
        }
        if (e.key === "Enter") {
            cardRefs.current[index]?.click(); // 링크 클릭
        }
    };

    return (
        <div className="bg-dark min-vh-100 d-flex justify-content-center align-items-start py-5 text-light position-relative">
            <div className="container" style={{ maxWidth: "1400px" }}>
                <div className="text-center mb-5">
                    <img
                        src={`${process.env.PUBLIC_URL}/factorio_icon.png`}
                        alt="Logo"
                        className="slow-spin"
                        style={{ width: "100px", height: "100px" }}
                    />
                </div>

                {/* 검색창 */}
                {showSearch && (
                    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center z-3">
                        <div className="bg-secondary p-4 rounded shadow" style={{ minWidth: "400px" }}>
                            <input
                                ref={inputRef}
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="검색어 입력 후 Enter"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                            <button className="btn btn-outline-light mt-3 w-100" onClick={handleCloseSearch}>
                                닫기 (ESC)
                            </button>
                        </div>
                    </div>
                )}

                {/* 그룹 출력 */}
                {renderGroups.map((group, idx) => (
                    <div key={idx} className="mb-5">
                        <h3 className="mb-4 border-bottom pb-2">{group.title}</h3>
                        <div className="row row-cols-2 row-cols-md-6 g-4">
                            {group.bookmarks.map((bookmark, index) => (
                                <div className="col" key={index}>
                                    <div
                                        className="card h-100 bg-secondary text-white text-center p-4 border-0 shadow-sm d-flex flex-column justify-content-between"
                                        tabIndex="0"
                                        ref={(el) => (cardRefs.current[index] = el)}
                                        onKeyDown={(e) => handleCardKeyDown(e, index)}
                                        onClick={() => window.open(bookmark.url, "_blank")}
                                        role="button"
                                        style={{ cursor: "pointer" }}
                                    >
                                        {/* 아이콘 영역 */}
                                        <div style={{ height: "60px" }} className="d-flex justify-content-center align-items-end mb-3">
                                            {bookmark.icon.startsWith("http") ? (
                                                <img
                                                    src={bookmark.icon}
                                                    alt={bookmark.name}
                                                    style={{ width: "40px", height: "40px", objectFit: "contain" }}
                                                />
                                            ) : (
                                                <i className={`bi ${bookmark.icon} fs-2`}></i>
                                            )}
                                        </div>

                                        {/* 텍스트 */}
                                        <h5 className="mt-auto" style={{ fontSize: "1rem" }}>{bookmark.name}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {/* {noResultMessage && (
                <div
                    className="position-fixed bottom-0 end-0 m-4 bg-danger text-white px-4 py-2 rounded shadow"
                    style={{ zIndex: 9999, fontSize: "0.9rem" }}
                >
                    검색 결과가 없습니다 😢
                </div>
            )} */}
        </div>
    );
};

export default Home;

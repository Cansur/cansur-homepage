import React from 'react';

// 북마크 데이터: 그룹별로 분리
const bookmarkGroups = [
    {
        title: "📚 Study Sites",
        bookmarks: [
            { name: "Google Scholar", icon: "bi-google", url: "https://scholar.google.com" },
            { name: "Stack Overflow", icon: "bi-stack-overflow", url: "https://stackoverflow.com" },
            { name: "W3Schools", icon: "bi-journal-code", url: "https://www.w3schools.com" },
        ],
    },
    {
        title: "🎥 Video Sites",
        bookmarks: [
            { name: "YouTube", icon: "bi-youtube", url: "https://www.youtube.com" },
            { name: "Vimeo", icon: "bi-camera-video", url: "https://vimeo.com" },
        ],
    },
];

const Home = () => {
    return (
        <div className="bg-dark min-vh-100 d-flex justify-content-center align-items-start py-5 text-light">
            <div className="container" style={{ maxWidth: "900px" }}>
                <h1 className="text-center mb-5">📌 My Bookmarks</h1>

                {bookmarkGroups.map((group, idx) => (
                    <div key={idx} className="mb-5">
                        <h3 className="mb-4 border-bottom pb-2">{group.title}</h3>
                        <div className="row row-cols-2 row-cols-md-3 g-4">
                            {group.bookmarks.map((bookmark, index) => (
                                <div className="col" key={index}>
                                    <div className="card h-100 bg-secondary text-white text-center p-4 border-0 shadow-sm">
                                        <a
                                            href={bookmark.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white text-decoration-none"
                                        >
                                            <i className={`bi ${bookmark.icon} fs-1 mb-3`}></i>
                                            <h5>{bookmark.name}</h5>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

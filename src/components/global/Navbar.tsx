import { useState, useRef, useEffect } from 'react';
import Engineering from "../logos/Engineering.astro";
import Separator from '../util/Separator.astro';
import Pyro from "../logos/Engineering.astro";
import { Icon } from 'astro-icon/components';
import { transition } from "../../lib/constants";
import Logo from '../logos/Logo.astro';

const Navigation = ({ isFirefox = false }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef(null);
  const searchBtnRef = useRef(null);
  
  const DURATION = 400;
  const TRANSITION = transition;

  useEffect(() => {
    // Check if current path starts with /search/
    setSearchOpen(window.location.pathname.startsWith("/search/"));
  }, []);

  useEffect(() => {
    if (!searchOpen) {
      clearSearch();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (searchOpen) {
      focusSearchInput();
    }
  }, [searchOpen]);

  const clearSearch = () => {
    setTimeout(() => {
      setSearchValue("");
    }, 100);
  };

  const openSearch = () => {
    setSearchOpen(true);
  };

  const focusSearchInput = () => {
	// @ts-ignore
    searchInputRef.current?.focus();
  };

  const closeSearch = () => {
    if (searchValue.trim()) return;
    setSearchOpen(false);
  };

  const handleSearch = async (e: { key: string; }) => {
    if (e.key !== "Enter") return;
    const searchQuery = searchValue.trim();
    const path = searchQuery ? `/search/${encodeURIComponent(searchQuery)}` : "/";
    window.location.href = path;
  };

  const transitionStyle = {
    transition: `all ${DURATION}ms ${TRANSITION}`
  };

  return (
    <nav className="fixed z-50 flex h-24 w-screen items-center justify-center bg-black/75 backdrop-blur-lg md:px-8">
      <div className="flex h-full w-full max-w-[1400px] items-center justify-center px-4">
        <div className="flex flex-grow items-center">
          <a href="https://pyro.host">
           {/* <Pyro /> */}
          </a>
          {/* <Separator /> */}
          <a className="flex cursor-pointer" href="/">
            {/* <Engineering /> */}
            <div className="hidden items-center sm:flex">
              <div className="-mt-0.5 ml-4 select-none text-lg font-bold text-white">
                Engineering
              </div>
            </div>
          </a>
        </div>
        <div className="flex flex-shrink-0 items-center gap-6">
          <a
            className="btn !h-10 !w-10 !min-w-0 !px-0"
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <Icon name="heroicons-solid:rss" width="20" /> */}
          </a>
          <button
            ref={searchBtnRef}
            className={`relative h-10 ${
              searchOpen
                ? 'w-72 cursor-default hover:!bg-[#191919] active:!bg-[#191919]'
                : 'w-28'
            }`}
            style={transitionStyle}
            onClick={openSearch}
          >
            <div
              className={`absolute left-0 top-0 flex h-full w-full items-center justify-center ${
                searchOpen ? 'pointer-events-auto opacity-0' : 'pointer-events-none opacity-100'
              }`}
              style={transitionStyle}
            >
              {/* <Icon name="heroicons-solid:search" width="20" /> */}
              <span className="text-sm">Search</span>
            </div>
            <div
              className={`absolute top-0 flex h-full w-full items-center justify-center ${
                searchOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
              }`}
              style={transitionStyle}
            >
              <button
                tabIndex={searchOpen ? 0 : -1}
                className="absolute right-4 h-fit w-fit min-w-0 border-none !bg-transparent p-0 text-black"
                onClick={(e) => {
                  e.stopPropagation();
                  closeSearch();
                }}
              >
                {/* <Icon name="heroicons-solid:search" width="20" /> */}
              </button>
              <input
                value={searchValue}
                ref={searchInputRef}
                onChange={(e) => setSearchValue(e.target.value)}
                tabIndex={searchOpen ? 0 : -1}
                onBlur={closeSearch}
                className="h-full w-full border-none bg-[#191919] px-4 pr-10 text-sm text-white outline-none selection:bg-black selection:text-white"
                type="text"
                placeholder="Search"
                onKeyDown={handleSearch}
              />
            </div>
          </button>
        </div>
        <div
          className="pointer-events-none absolute left-1/2 top-0 -z-10 mt-[1px] h-full w-full max-w-[1400px] -translate-x-1/2 border-b border-dashed border-neutral-800"
        >
          {/* Note: Noise component should be imported and used here */}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
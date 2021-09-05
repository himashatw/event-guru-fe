import React, { useEffect, useState, useRef } from "react";
import axios from "../../Services/axios";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import AdCard from "./AdCard";

const scrollToRef = (ref) =>
  window.scrollTo({ left: 0, top: ref.current.offsetTop, behavior: "smooth" });

function HomePage() {
  const [adList, setAdList] = useState([]);

  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("/admin/ads")
        .then((response) => {
          console.log(response.data.result);
          setAdList(response.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  return (
    <>
      <header class="min-h-screen bg-white ">
        <nav class="flex items-center py-8 px-14 justify-between sticky top-0 z-50 bg-white">
          <div class="flex items-center">
            <h1 class="text-3xl font-bold text-gray-700 ">Event Guru</h1>
            <div class="ml-10 text-xl">
              <ul class="md:flex space-x-8 hidden ">
                <li>
                  <a
                    onClick={() => {
                      executeScroll();
                    }}
                    class="text-gray-800 font-semibold cursor-pointer"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-800 font-semibold">
                    Contact Us
                  </a>
                </li>
                {/* <li>
                  <a href="#" class="text-gray-800 font-semibold">
                    World
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
          <div class="lg:flex  items-center space-x-3 py-3 px-6 w-36 bg-indigo-600 text-white rounded-lg  transition-all duration-400 transform hover:scale-105 cursor-pointer hover:shadow-lg">
            <button>Sign In</button>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </span>
          </div>
        </nav>
        <div class="md:flex space-x-16 mt-20 md:mr-0 mr-10">
          <div class="md:flex items-center pl-16 mr-10">
            <div class="">
              <h1 class="lg:text-5xl  font-bold leading-tight text-3xl">
                Welcome to Event Guru!
              </h1>
              <p class="mt-4 text-2xl font-normal ">
                Every idea, every important moment, every event, every party,
                every presentation will be more breathtaking, spectacular and
                impressive than you had ever hoped for...{" "}
              </p>
              <p class="mt-4 text-2xl font-normal"> Try our latest offers !</p>
              <div class="flex mt-10 w-52 items-center space-x-3 py-3 px-6 bg-indigo-600 text-white rounded-lg  transition-all duration-400 transform hover:scale-105 cursor-pointer hover:shadow-lg">
                <button class="text-lg text-md ">Register Now!</button>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div class=" max-w-2xl pr-14 md:flex justify-center items-center hidden">
            <img
              class="rounded-lg"
              src="https://static.onecms.io/wp-content/uploads/sites/23/2021/07/27/outdoor-party-2000.jpg"
              alt=""
            />
          </div>
        </div>
      </header>
      <Container minWidth="md" ref={myRef}>
        {/* End hero unit */}
        <Grid container spacing={7}>
          {adList.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <AdCard cardData={card} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default HomePage;

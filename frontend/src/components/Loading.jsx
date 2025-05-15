export default function Loading() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="mt-4 text-gray-600 text-2xl">Loading...</p>
      <style>
        {`
          .loader {
              display: inline-block;
              position: relative;
              width: 80px;
              height: 80px;
          }
          .loader div {
              position: absolute;
              border: 4px solid #4a90e2;
              opacity: 1;
              border-radius: 50%;
              animation: loader-animation 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
          }
          .loader div:nth-child(2) {
              animation-delay: -0.5s;
          }
          @keyframes loader-animation {
              0% {
                  top: 36px;
                  left: 36px;
                  width: 0;
                  height: 0;
                  opacity: 1;
              }
              100% {
                  top: 0px;
                  left: 0px;
                  width: 72px;
                  height: 72px;
                  opacity: 0;
              }
          }
      `}
      </style>
    </div>
  );
}

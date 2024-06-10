import { Link } from "react-router-dom"
import { useAnimate } from "../../hooks/animatePages/useAnimate"

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import classes from "./NotFound404.module.scss"

export function NotFound404() {
    const { animate } = useAnimate()
    return (
        <div className={`${classes.discoveryPreview} ${animate && classes.discoveryPreviewAnimate}`}>
            <div className={classes.mainContent}>
                <svg width="861" height="572" viewBox="0 0 861 572" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_346_2397)">
                        <path
                            d="M436.101 160.527C428.432 147.843 419.344 134.299 405.111 130.158C388.629 125.361 371.698 134.889 357.337 144.292C314.387 172.412 273.027 202.886 233.443 235.575L233.487 236.068C264.304 233.942 295.121 231.817 325.938 229.692C348.203 228.157 371.233 226.409 390.91 215.876C398.376 211.88 405.654 206.541 414.115 206.169C424.627 205.706 433.792 213.048 440.995 220.718C483.603 266.089 495.932 335.472 543.734 375.334C513.592 300.999 477.601 229.171 436.101 160.527Z"
                            fill="#E5E0DF"
                        />
                        <path
                            d="M698.002 545.355C693.29 539.406 691.365 538.012 686.717 532.008C648.875 483.064 613.305 432.466 580.01 380.215C557.394 344.729 535.9 308.561 515.527 271.711C505.828 254.192 496.395 236.536 487.227 218.742C480.114 204.946 473.159 191.066 466.363 177.104C464.419 173.117 462.531 169.111 460.651 165.095C456.224 155.653 451.878 146.165 447.212 136.851C441.895 126.235 435.423 115.106 425.659 107.974C421.216 104.595 415.903 102.55 410.341 102.079C402.393 101.566 395.059 104.848 388.165 108.432C337.727 134.733 290.506 167.708 247.796 205.23C204.976 242.836 166.702 285.322 133.754 331.821C132.746 333.26 130.362 331.885 131.38 330.437C135.386 324.772 139.471 319.167 143.636 313.624C195.425 244.746 258.926 185.515 331.236 138.638C343.402 130.755 355.796 123.24 368.419 116.096C374.781 112.493 381.171 108.936 387.67 105.599C394.042 102.327 400.807 99.3839 408.086 99.2739C432.856 98.8889 445.681 126.941 454.491 145.816C457.259 151.757 460.061 157.679 462.897 163.583C473.614 185.997 484.743 208.206 496.284 230.211C503.407 243.797 510.686 257.303 518.121 270.73C541.259 312.542 565.852 353.508 591.9 393.627C626.406 446.77 660.636 493.716 699.946 543.412C701.028 544.787 699.093 546.749 698.002 545.355Z"
                            fill="#E4E4E4"
                        />
                        <path
                            d="M245.348 191.378C243.908 189.774 242.478 188.169 241.03 186.565C229.607 173.933 217.351 161.447 201.665 154.205C194.186 150.642 186.022 148.75 177.739 148.658C169.176 148.686 160.807 150.932 152.895 154.076C149.155 155.57 145.497 157.266 141.895 159.072C137.778 161.144 133.735 163.354 129.711 165.581C122.157 169.761 114.701 174.125 107.343 178.672C92.7028 187.72 78.5209 197.459 64.7975 207.888C57.6834 213.297 50.7162 218.883 43.8958 224.646C37.552 230 31.3367 235.497 25.2496 241.138C23.9479 242.339 22.0043 240.396 23.306 239.195C24.9103 237.7 26.5329 236.215 28.1556 234.749C32.7392 230.605 37.3963 226.541 42.1267 222.556C50.7529 215.277 59.6024 208.279 68.6753 201.563C82.7839 191.112 97.3782 181.37 112.458 172.337C119.994 167.827 127.633 163.506 135.376 159.375C137.714 158.128 140.08 156.909 142.472 155.754C147.901 153.015 153.542 150.719 159.34 148.887C167.553 146.231 176.243 145.377 184.816 146.385C193.094 147.589 201.069 150.348 208.321 154.516C223.722 163.124 235.667 176.435 247.291 189.425C248.465 190.745 246.53 192.698 245.348 191.378Z"
                            fill="#E4E4E4"
                        />
                        <path
                            d="M560.908 322.285L597.813 308.787L616.136 302.085C622.103 299.902 628.057 297.418 634.226 295.855C639.587 294.323 645.279 294.396 650.599 296.063C655.344 297.819 659.687 300.512 663.37 303.98C667.133 307.445 670.634 311.184 673.845 315.166C677.835 319.961 681.765 324.805 685.713 329.633C702.007 349.561 718.195 369.574 734.276 389.675C750.357 409.775 766.33 429.96 782.196 450.231C798.1 470.551 813.896 490.956 829.581 511.446C831.503 513.957 833.423 516.468 835.341 518.981C836.401 520.369 838.79 519 837.716 517.593C821.914 496.896 806.003 476.285 789.981 455.758C773.92 435.182 757.747 414.693 741.464 394.292C725.181 373.891 708.789 353.579 692.286 333.355C688.174 328.316 684.056 323.283 679.931 318.256C676.452 314.015 673.011 309.729 669.195 305.782C662.19 298.537 653.437 292.134 642.961 291.96C636.801 291.858 630.84 293.813 625.117 295.883C618.947 298.115 612.792 300.389 606.63 302.642L569.468 316.235L560.177 319.633C558.528 320.236 559.24 322.895 560.908 322.285Z"
                            fill="#E4E4E4"
                        />
                        <path
                            d="M196.809 170.1C178.055 160.462 154.037 162.349 136.804 174.391C169.676 180.063 202.188 187.651 234.174 197.117C220.892 189.333 210.501 177.138 196.809 170.1Z"
                            fill="#E5E0DF"
                        />
                        <path
                            d="M136.619 174.358L133.009 177.293C134.23 176.266 135.5 175.303 136.804 174.391C136.742 174.381 136.681 174.369 136.619 174.358Z"
                            fill="#E5E0DF"
                        />
                        <path
                            d="M661.981 322.42C658.348 317.998 654.42 313.367 648.986 311.571L643.913 311.771C682.531 380.01 734.687 439.637 797.181 486.992C752.114 432.135 707.047 377.277 661.981 322.42Z"
                            fill="#E5E0DF"
                        />
                        <path
                            d="M346.515 285.94C348.863 294.47 354.152 301.894 361.446 306.899C364.266 308.819 367.603 310.661 368.568 313.934C369.075 316.02 368.763 318.221 367.694 320.084C366.628 321.922 365.33 323.616 363.833 325.125L363.696 325.637C356.698 321.49 350.04 316.244 346.174 309.086C342.308 301.928 341.768 292.547 346.515 285.94Z"
                            fill="#E5E0DF"
                        />
                        <path
                            d="M579.515 488.94C581.863 497.47 587.152 504.894 594.446 509.899C597.266 511.819 600.603 513.661 601.568 516.934C602.075 519.02 601.763 521.221 600.694 523.084C599.628 524.922 598.33 526.616 596.833 528.125L596.696 528.637C589.698 524.49 583.04 519.244 579.174 512.086C575.308 504.928 574.768 495.547 579.515 488.94Z"
                            fill="#E5E0DF"
                        />
                        <path
                            d="M114.515 474.94C116.863 483.47 122.152 490.894 129.446 495.899C132.266 497.819 135.603 499.661 136.568 502.934C137.075 505.02 136.763 507.221 135.694 509.084C134.628 510.922 133.33 512.616 131.833 514.125L131.696 514.637C124.698 510.49 118.04 505.244 114.174 498.086C110.308 490.928 109.768 481.547 114.515 474.94Z"
                            fill="#E5E0DF"
                        />
                        <path
                            d="M649.615 102C677.781 102 700.615 79.1665 700.615 51C700.615 22.8335 677.781 0 649.615 0C621.448 0 598.615 22.8335 598.615 51C598.615 79.1665 621.448 102 649.615 102Z"
                            fill="#F1C21B"
                        />
                        <path
                            d="M741.65 11.8704C716.933 8.52949 688.715 21.8891 682.309 45.994C680.694 41.7081 677.759 38.0465 673.927 35.538C670.095 33.0295 665.565 31.8041 660.992 32.0388C656.418 32.2735 652.037 33.9562 648.482 36.8437C644.927 39.7312 642.382 43.6741 641.215 48.1027L644.045 50.1293C697.012 61.5836 751.842 61.3357 804.704 49.403C787.511 31.334 766.367 15.2113 741.65 11.8704Z"
                            fill="#F0F0F0"
                        />
                        <path
                            d="M635.65 79.8704C610.933 76.5295 582.715 89.8891 576.309 113.994C574.694 109.708 571.759 106.046 567.927 103.538C564.095 101.03 559.565 99.8041 554.992 100.039C550.418 100.274 546.037 101.956 542.482 104.844C538.927 107.731 536.382 111.674 535.215 116.103L538.045 118.129C591.012 129.584 645.842 129.336 698.704 117.403C681.511 99.334 660.367 83.2113 635.65 79.8704Z"
                            fill="#F0F0F0"
                        />
                        <path
                            d="M851.377 92.7283C851.275 92.7285 851.173 92.7127 851.075 92.6814C586.668 9.06326 353.631 19.9978 204.695 43.8953C184.427 47.1463 164.104 50.9011 144.292 55.0564C139.233 56.116 133.986 57.2517 128.695 58.4343C122.376 59.8416 116.141 61.2908 110.163 62.74C107.581 63.3513 105.049 63.9676 102.568 64.5886C98.8096 65.5164 94.9961 66.4832 90.9082 67.5456C86.3404 68.7234 81.6992 69.9587 77.1108 71.2175C77.0941 71.2234 77.0769 71.2283 77.0596 71.2322L77.0601 71.2332C71.8775 72.6482 66.7222 74.1043 61.7368 75.5584C59.0386 76.3377 56.4331 77.1062 53.9375 77.865C53.6587 77.9422 53.4116 78.0164 53.1612 78.0925L52.625 78.2556C52.3145 78.3503 52.0078 78.4431 51.7012 78.531L51.6817 78.5369L51.6821 78.5379L50.8706 78.7899C49.9028 79.0829 48.9585 79.369 48.0298 79.6541C23.4849 87.2205 9.9917 92.6034 9.8584 92.6561C9.73651 92.7049 9.60619 92.7293 9.47487 92.7278C9.34356 92.7263 9.21383 92.6989 9.09308 92.6473C8.97234 92.5956 8.86294 92.5208 8.77115 92.4268C8.67936 92.3329 8.60697 92.2218 8.55811 92.0999C8.50925 91.978 8.48489 91.8477 8.48639 91.7164C8.4879 91.5851 8.51526 91.4554 8.5669 91.3346C8.61854 91.2139 8.69345 91.1045 8.78737 91.0127C8.88129 90.9209 8.99237 90.8485 9.11426 90.7996C9.24854 90.7469 22.8076 85.3368 47.4419 77.742C48.374 77.4559 49.3208 77.1698 50.2915 76.8758L51.0454 76.6414C51.0713 76.6317 51.0972 76.6239 51.1235 76.616C51.4287 76.5291 51.7334 76.4364 52.043 76.3426L52.5801 76.1795C52.8477 76.0985 53.1113 76.0184 53.3814 75.9442C55.8599 75.1903 58.4741 74.4198 61.1792 73.6375C66.1665 72.1825 71.3267 70.7264 76.5132 69.3094C76.5293 69.3035 76.5459 69.2996 76.562 69.2948C81.1665 68.0321 85.8247 66.7908 90.4072 65.6092C94.5015 64.5457 98.3222 63.577 102.087 62.6473C104.579 62.0272 107.115 61.4096 109.696 60.7947C115.682 59.3436 121.929 57.8924 128.259 56.4822C133.559 55.2986 138.815 54.16 143.881 53.0994C163.725 48.9373 184.079 45.1766 204.378 41.9207C353.527 17.9891 586.899 7.03687 851.678 90.7751C851.905 90.847 852.1 90.998 852.226 91.2008C852.352 91.4035 852.401 91.6447 852.365 91.8807C852.329 92.1167 852.209 92.3319 852.028 92.4873C851.847 92.6428 851.616 92.7283 851.377 92.7283Z"
                            fill="#CCCCCC"
                        />
                        <path
                            d="M263.355 419.84C263.008 418.827 262.425 417.912 261.655 417.17C261.37 416.906 261.062 416.668 260.735 416.46C258.125 414.72 254.225 414.33 251.745 416.46C251.495 416.677 251.264 416.914 251.055 417.17C250.315 418.08 249.555 418.97 248.775 419.84C247.495 421.3 246.185 422.71 244.815 424.08C244.425 424.46 244.035 424.85 243.635 425.23C243.405 425.46 243.175 425.68 242.945 425.9C242.065 426.74 241.165 427.55 240.255 428.35C239.775 428.78 239.295 429.2 238.805 429.61C238.075 430.22 237.345 430.83 236.605 431.42C236.535 431.47 236.465 431.52 236.395 431.58C236.375 431.59 236.365 431.61 236.345 431.62C236.335 431.62 236.325 431.62 236.315 431.64C236.287 431.651 236.263 431.668 236.245 431.69C236.025 431.84 235.875 431.94 235.765 432.03C235.805 432.01 235.845 431.98 235.885 431.96C235.705 432.1 235.515 432.24 235.335 432.38C233.585 433.67 231.795 434.91 229.965 436.07C225.437 438.968 220.681 441.493 215.745 443.62C215.415 443.75 215.075 443.89 214.735 444.02C201.809 449.315 187.788 451.382 173.885 450.04C172.464 449.93 171.044 449.78 169.625 449.59C167.985 449.35 166.355 449.06 164.735 448.73C158.567 447.499 152.533 445.678 146.715 443.29C139.437 439.957 132.515 435.897 126.055 431.17C125.055 430.46 124.045 429.75 123.035 429.06C124.185 426.24 125.315 423.42 126.415 420.58C126.965 419.21 127.495 417.84 128.015 416.46C132.105 405.83 135.945 395.1 139.625 384.33C143.345 373.42 146.855 362.447 150.155 351.41C150.495 350.29 150.825 349.17 151.145 348.05C152.875 342.22 154.535 336.377 156.125 330.52C156.275 329.95 156.435 329.39 156.575 328.82C157.035 327.14 157.485 325.46 157.925 323.78C158.925 319.99 156.665 315.46 152.685 314.55C150.768 314.059 148.736 314.33 147.016 315.308C145.296 316.285 144.023 317.892 143.465 319.79C143.035 321.41 142.605 323.02 142.165 324.64C140.055 332.47 137.835 340.273 135.505 348.05C135.165 349.17 134.825 350.29 134.485 351.41C129.345 368.35 123.701 385.12 117.555 401.72C116.815 403.73 116.065 405.733 115.305 407.73C114.935 408.71 114.565 409.69 114.185 410.67C113.455 412.6 112.705 414.53 111.955 416.46C111.524 417.59 111.085 418.72 110.645 419.84C110.355 420.55 110.075 421.26 109.795 421.96C106.943 420.936 103.989 420.225 100.985 419.84L100.505 419.78C98.175 419.5 95.819 419.52 93.4945 419.84C90.0156 420.246 86.6683 421.411 83.6893 423.253C80.7102 425.095 78.1722 427.569 76.2545 430.5C71.4845 438.01 71.5445 448.75 78.2345 455.13C85.1245 461.7 95.5546 461.65 103.665 457.54C107.962 455.215 111.586 451.818 114.185 447.68C115.18 446.18 116.095 444.628 116.925 443.03C117.135 443.17 117.345 443.31 117.555 443.46C118.355 444.02 119.155 444.59 119.945 445.15C124.548 448.485 129.398 451.463 134.455 454.06C145.326 459.465 157.029 463.004 169.075 464.53C169.345 464.56 169.605 464.6 169.875 464.63C171.205 464.8 172.545 464.93 173.885 465.04C193.107 466.489 212.352 462.555 229.465 453.68C230.915 452.93 232.351 452.143 233.775 451.32C235.985 450.04 238.145 448.68 240.255 447.24C241.405 446.46 242.525 445.67 243.635 444.84C248.485 441.267 253.006 437.268 257.145 432.89C258.715 431.24 260.218 429.537 261.655 427.78C263.013 426.343 263.796 424.457 263.855 422.48C263.847 421.577 263.677 420.683 263.355 419.84ZM97.7646 443.66C97.9746 443.51 98.1846 443.35 98.3846 443.19C98.3246 443.34 98.0345 443.51 97.7646 443.66ZM100.975 440.43C100.745 440.69 100.535 440.95 100.305 441.21C99.6048 441.993 98.8531 442.728 98.0545 443.41C97.9445 443.51 97.8246 443.61 97.7046 443.7C97.7032 443.7 97.7019 443.7 97.7007 443.701C97.6995 443.701 97.6984 443.702 97.6974 443.703C97.6965 443.704 97.6957 443.705 97.6953 443.706C97.6948 443.707 97.6945 443.709 97.6946 443.71C97.5501 443.775 97.4098 443.848 97.2745 443.93C96.8445 444.19 96.4045 444.43 95.9546 444.65C95.0735 444.974 94.1671 445.225 93.2446 445.4C92.5357 445.452 91.8243 445.458 91.1146 445.42H91.0945C90.6048 445.311 90.1208 445.178 89.6446 445.02C89.4046 444.9 89.1746 444.76 88.9446 444.62C88.8546 444.54 88.7745 444.46 88.7245 444.41C88.6269 444.321 88.5366 444.224 88.4546 444.12C88.4546 444.119 88.4544 444.117 88.4539 444.116C88.4534 444.115 88.4527 444.114 88.4518 444.113C88.4508 444.112 88.4497 444.111 88.4485 444.111C88.4472 444.11 88.4459 444.11 88.4446 444.11C88.3346 443.91 88.2146 443.71 88.1046 443.51C88.0989 443.505 88.0953 443.498 88.0946 443.49C88.0146 443.24 87.9446 442.98 87.8846 442.72C87.8629 442.263 87.8662 441.806 87.8946 441.35C88.0288 440.711 88.2093 440.083 88.4346 439.47C88.6371 439.036 88.8676 438.615 89.1246 438.21C89.1446 438.17 89.2446 438.01 89.3546 437.83C89.3646 437.82 89.3646 437.82 89.3646 437.81C89.5146 437.64 89.6646 437.46 89.8246 437.3C90.0946 437 90.3846 436.74 90.6746 436.47C91.2386 436.101 91.8229 435.764 92.4246 435.46C93.3793 435.121 94.3589 434.857 95.3546 434.67C96.8229 434.553 98.2987 434.567 99.7646 434.71C101.153 434.951 102.523 435.288 103.865 435.72C103.052 437.298 102.126 438.815 101.095 440.26C101.055 440.32 101.015 440.38 100.975 440.43ZM89.8546 437.14C89.7665 437.281 89.6624 437.412 89.5446 437.53C89.6239 437.383 89.7289 437.251 89.8546 437.14Z"
                            fill="#565151"
                        />
                        <path
                            d="M233.295 317.71C233.205 320.85 233.115 323.99 233.025 327.13C232.835 334.1 232.638 341.073 232.435 348.05C232.225 355.9 232.005 363.747 231.775 371.59C231.665 375.64 231.551 379.69 231.435 383.74C231.125 394.65 230.818 405.557 230.515 416.46C230.485 417.59 230.445 418.71 230.415 419.84C230.265 425.25 230.115 430.66 229.965 436.07C229.795 441.94 229.628 447.81 229.465 453.68C229.345 458.08 229.221 462.483 229.095 466.89C228.195 498.82 227.295 530.75 226.395 562.68C226.357 564.657 225.554 566.543 224.156 567.941C222.757 569.34 220.872 570.142 218.895 570.18C216.91 570.164 215.012 569.369 213.609 567.966C212.206 566.563 211.411 564.664 211.395 562.68C211.895 544.72 212.401 526.76 212.915 508.8C213.365 492.56 213.821 476.32 214.285 460.08C214.435 454.73 214.585 449.377 214.735 444.02C214.965 435.96 215.191 427.9 215.415 419.84C215.445 418.71 215.485 417.59 215.515 416.46C215.535 415.47 215.565 414.49 215.595 413.5C216.035 397.85 216.475 382.197 216.915 366.54C217.095 360.38 217.268 354.217 217.435 348.05C217.635 341.02 217.835 333.993 218.035 326.97C218.125 323.88 218.205 320.8 218.295 317.71C218.333 315.733 219.135 313.847 220.533 312.449C221.932 311.05 223.817 310.248 225.795 310.21C227.779 310.226 229.677 311.021 231.08 312.424C232.483 313.827 233.279 315.726 233.295 317.71Z"
                            fill="#565151"
                        />
                        <path
                            d="M644.723 319.791C636.858 349.571 627.459 378.924 616.562 407.732C613.555 415.679 610.478 423.609 607.19 431.444L607.946 429.653C606.478 433.385 604.604 436.943 602.357 440.265C602.204 440.479 602.048 440.691 601.89 440.901C602.667 439.907 602.814 439.711 602.333 440.312C602.079 440.613 601.828 440.914 601.565 441.207C600.865 441.991 600.114 442.727 599.316 443.411C599.115 443.582 598.911 443.751 598.704 443.915L599.642 443.186C599.533 443.443 598.769 443.783 598.531 443.929C597.761 444.394 596.957 444.801 596.127 445.147L597.918 444.391C596.557 444.94 595.137 445.329 593.687 445.552L595.681 445.284C594.256 445.481 592.812 445.496 591.383 445.33L593.377 445.598C592.208 445.437 591.064 445.129 589.972 444.681L591.763 445.437C591.181 445.183 590.62 444.884 590.085 444.541C589.813 444.364 588.979 443.732 590.07 444.565C591.203 445.431 590.215 444.64 589.982 444.41C589.788 444.218 589.612 444.01 589.422 443.815C588.54 442.91 590.419 445.371 589.819 444.313C589.499 443.783 589.206 443.237 588.941 442.676L589.697 444.468C589.353 443.615 589.109 442.726 588.969 441.817L589.237 443.81C589.094 442.68 589.093 441.536 589.234 440.406L588.966 442.399C589.149 441.137 589.483 439.902 589.961 438.719L589.205 440.511C589.537 439.715 589.931 438.947 590.383 438.212C590.59 437.833 590.834 437.474 591.111 437.141C591.16 437.157 589.842 438.654 590.542 437.898C590.725 437.7 590.896 437.492 591.081 437.296C591.377 436.982 591.694 436.695 592.006 436.398C593.051 435.404 590.544 437.364 591.75 436.577C592.623 436.003 593.543 435.501 594.499 435.078L592.707 435.834C594.309 435.176 595.987 434.726 597.703 434.494L595.709 434.762C597.857 434.515 600.028 434.541 602.169 434.838L600.176 434.571C602.888 434.982 605.539 435.727 608.067 436.791L606.276 436.034C611.666 438.348 616.439 441.784 621.204 445.152C625.806 448.485 630.656 451.463 635.71 454.059C646.583 459.465 658.286 463.005 670.332 464.533C687.608 466.649 705.138 464.393 721.315 457.971C737.492 451.55 751.797 441.169 762.918 427.781C764.275 426.342 765.056 424.454 765.115 422.477C765.1 420.491 764.312 418.589 762.918 417.174C760.166 414.648 754.969 413.935 752.311 417.174C749.793 420.249 747.086 423.163 744.205 425.901C742.86 427.177 741.479 428.414 740.062 429.611C739.253 430.295 738.433 430.965 737.601 431.622C737.208 431.933 735.983 432.76 737.865 431.425C737.433 431.731 737.02 432.065 736.594 432.379C730.296 437.022 723.471 440.904 716.262 443.944L718.053 443.188C710.317 446.433 702.192 448.659 693.882 449.811L695.876 449.543C687.327 450.667 678.668 450.654 670.122 449.505L672.116 449.773C663.573 448.599 655.218 446.324 647.259 443.002L649.051 443.758C641.371 440.36 634.083 436.139 627.314 431.167C623.792 428.559 620.077 426.221 616.201 424.173C611.686 421.867 606.798 420.381 601.763 419.785C592.325 418.674 582.706 422.35 577.517 430.505C572.742 438.01 572.803 448.749 579.491 455.13C586.379 461.703 596.809 461.647 604.927 457.536C612.744 453.576 617.439 445.35 620.742 437.594C628.173 420.139 634.752 402.28 640.881 384.331C646.946 366.573 652.445 348.635 657.38 330.518C657.991 328.274 658.593 326.028 659.187 323.779C660.188 319.99 657.926 315.459 653.948 314.553C652.032 314.06 649.998 314.33 648.277 315.307C646.555 316.285 645.281 317.892 644.723 319.791Z"
                            fill="#565151"
                        />
                        <path
                            d="M719.555 317.709L716.856 413.503L714.17 508.797L712.652 562.68C712.668 564.664 713.464 566.562 714.867 567.965C716.27 569.368 718.168 570.164 720.152 570.18C722.129 570.142 724.014 569.34 725.413 567.941C726.811 566.543 727.613 564.658 727.652 562.68L730.351 466.887L733.037 371.593L734.555 317.709C734.538 315.726 733.743 313.828 732.34 312.425C730.937 311.022 729.039 310.226 727.055 310.209C725.078 310.248 723.192 311.05 721.794 312.448C720.396 313.847 719.593 315.732 719.555 317.709Z"
                            fill="#565151"
                        />
                        <path
                            opacity="0.2"
                            d="M459.957 535.935H462.286V429.893H516.615V427.571H462.286V382.826H504.242C503.627 382.044 502.994 381.272 502.343 380.509H462.286V350.956C461.516 350.628 460.739 350.311 459.957 350.013V380.509H414.305V342.644C413.523 342.68 412.752 342.734 411.976 342.799V380.509H375.556V352.258C374.774 352.604 374.003 352.969 373.239 353.351V380.509H342.623V382.826H373.239V427.571H342.623V429.893H373.239V535.935H375.556V429.893C380.339 429.892 385.075 430.834 389.495 432.664C393.914 434.494 397.929 437.176 401.311 440.559C404.693 443.941 407.376 447.956 409.206 452.375C411.036 456.794 411.977 461.531 411.976 466.314V535.935H414.305V429.893H459.957V535.935ZM375.556 427.571V382.826H411.976V427.571H375.556ZM414.305 427.571V382.826H415.219C421.094 382.827 426.912 383.984 432.34 386.233C437.768 388.482 442.7 391.778 446.855 395.933C451.009 400.088 454.304 405.02 456.552 410.449C458.801 415.877 459.957 421.695 459.957 427.571H414.305Z"
                            fill="black"
                        />
                        <path
                            d="M445.735 504.14C442.803 517.219 435.78 529.023 425.685 537.84C424.945 538.48 424.205 539.1 423.435 539.71C421.565 539.88 419.708 540.053 417.865 540.23C416.335 540.37 414.825 540.52 413.325 540.66L413.055 540.69L412.865 539.05L412.105 532.41C409.156 527.597 407.329 522.182 406.758 516.566C406.186 510.95 406.886 505.278 408.805 499.97C411.445 492.85 416.225 486.56 420.925 480.32C427.415 471.7 433.725 463.18 433.955 452.67C437.148 456.757 439.803 461.237 441.855 466C439.919 466.911 438.18 468.192 436.735 469.77C436.325 470.22 435.915 470.85 436.195 471.39C436.435 471.85 437.035 471.96 437.555 472.02C438.805 472.15 440.065 472.28 441.315 472.41C442.315 472.52 443.315 472.62 444.315 472.73C445.524 476.701 446.345 480.78 446.765 484.91C447.438 491.334 447.091 497.824 445.735 504.14Z"
                            fill="#565151"
                        />
                        <path
                            d="M478.934 477.93C473.034 482.22 469.584 488.39 466.904 495.19C464.158 496.069 461.687 497.647 459.734 499.77C459.324 500.22 458.914 500.85 459.194 501.39C459.434 501.85 460.034 501.96 460.554 502.02C461.804 502.15 463.064 502.28 464.314 502.41C461.634 510.45 459.174 518.77 454.434 525.56C451.282 530.043 447.173 533.769 442.404 536.47C441.104 537.211 439.762 537.875 438.384 538.46C433.304 538.85 428.321 539.267 423.434 539.71C421.564 539.88 419.708 540.053 417.864 540.23C416.334 540.37 414.824 540.52 413.324 540.66C413.314 540.11 413.314 539.56 413.324 539.01C413.641 524.359 419.031 510.271 428.574 499.15C429.024 498.63 429.484 498.12 429.954 497.61C434.789 492.446 440.475 488.15 446.764 484.91C456.674 479.757 467.781 477.348 478.934 477.93Z"
                            fill="#24A148"
                        />
                        <path
                            d="M419.594 535.1L418.444 538.5L417.865 540.23C416.335 540.37 414.824 540.52 413.324 540.66L413.055 540.69C411.395 540.86 409.744 541.03 408.094 541.2C407.664 540.7 407.234 540.19 406.814 539.67C396.377 527.03 391.366 510.773 392.878 494.45C394.391 478.128 402.302 463.067 414.884 452.56C413.564 459.47 415.104 466.09 417.634 472.66C417.364 472.77 417.105 472.88 416.855 473C414.919 473.911 413.179 475.192 411.735 476.77C411.325 477.22 410.914 477.85 411.194 478.39C411.434 478.85 412.035 478.96 412.555 479.02C413.805 479.15 415.064 479.28 416.314 479.41C417.314 479.52 418.314 479.62 419.314 479.73C419.784 479.78 420.254 479.83 420.724 479.88C420.794 480.03 420.855 480.17 420.925 480.32C423.775 486.5 426.844 492.71 428.574 499.15C429.008 500.766 429.349 502.405 429.594 504.06C430.365 509.653 429.865 515.347 428.134 520.72C426.403 526.094 423.484 531.009 419.594 535.1Z"
                            fill="#24A148"
                        />
                        <path
                            d="M520.253 390.061C511.644 373.268 498.307 359.14 482.62 348.757C466.884 338.389 448.826 332.074 430.058 330.377C427.598 330.153 425.131 330.023 422.659 329.984C419.737 329.941 375.793 342.616 361.072 352.966C346.359 363.191 334.255 376.73 325.739 392.493C317.237 408.343 313.055 426.15 313.613 444.127C314.342 462.212 319.383 479.861 328.316 495.603C337.127 511.293 349.638 524.594 364.76 534.348C380.098 544.135 395.505 570.084 413.614 571C431.86 571.923 452.669 547.445 469.31 540.013C485.951 532.519 500.337 520.794 511.035 506.008C521.431 491.517 528.156 474.721 530.634 457.06C533.208 438.977 532.008 420.327 525.833 403.044C524.248 398.603 522.384 394.266 520.253 390.061C518.473 386.555 513.257 385.265 509.991 387.37C508.309 388.406 507.091 390.05 506.589 391.961C506.088 393.873 506.343 395.903 507.301 397.631C508.346 399.69 509.317 401.782 510.216 403.909L509.46 402.117C512.86 410.292 515.172 418.879 516.336 427.656L516.068 425.662C517.307 435.184 517.285 444.828 516.002 454.344L516.27 452.35C514.974 461.866 512.434 471.17 508.716 480.025L509.472 478.233C507.559 482.751 505.329 487.128 502.8 491.331C501.518 493.455 500.158 495.529 498.719 497.553C498.088 498.441 497.437 499.314 496.78 500.184C495.924 501.32 497.947 498.701 497.063 499.815C496.912 500.004 496.762 500.195 496.611 500.384C496.157 500.952 495.696 501.514 495.229 502.072C492.111 505.791 488.709 509.263 485.053 512.455C484.142 513.25 483.216 514.027 482.275 514.786C481.806 515.165 481.343 515.559 480.854 515.911C480.873 515.898 482.434 514.712 481.51 515.4C481.219 515.617 480.931 515.836 480.64 516.052C478.7 517.489 476.709 518.853 474.666 520.144C469.962 523.107 465.028 525.687 459.91 527.857L461.702 527.101C452.874 530.817 443.595 533.356 434.105 534.653L436.099 534.385C426.613 535.667 417 535.684 407.51 534.435L409.503 534.703C400.878 533.545 392.442 531.264 384.408 527.919L386.2 528.675C381.546 526.71 377.06 524.372 372.784 521.684C370.667 520.35 368.606 518.935 366.6 517.436C366.314 517.223 366.03 517.006 365.745 516.791C364.83 516.1 366.403 517.301 366.415 517.309C365.883 516.927 365.371 516.518 364.88 516.084C363.911 515.295 362.957 514.488 362.019 513.662C358.263 510.355 354.756 506.775 351.526 502.953C350.717 501.997 349.926 501.027 349.152 500.042C348.816 499.616 348.205 498.752 349.556 500.571C349.378 500.332 349.194 500.097 349.014 499.859C348.583 499.287 348.158 498.711 347.739 498.131C346.27 496.099 344.874 494.017 343.551 491.885C340.561 487.059 337.951 482.008 335.745 476.777L336.501 478.568C332.893 469.982 330.425 460.959 329.161 451.731L329.429 453.725C328.289 445.219 328.273 436.6 329.381 428.089L329.113 430.083C330.249 421.842 332.466 413.786 335.707 406.124L334.951 407.916C336.99 403.119 339.396 398.487 342.146 394.059C343.523 391.844 344.983 389.682 346.524 387.575C346.874 387.096 347.228 386.62 347.586 386.147C347.91 385.719 348.801 384.653 347.281 386.535C347.43 386.351 347.574 386.161 347.721 385.975C348.566 384.903 349.433 383.848 350.32 382.81C353.678 378.879 357.315 375.196 361.203 371.789C362.186 370.928 363.184 370.085 364.198 369.26C364.659 368.885 365.122 368.514 365.589 368.147C365.776 368 365.965 367.856 366.151 367.709C364.153 369.298 365.596 368.141 366.049 367.801C368.138 366.236 370.283 364.749 372.484 363.34C377.377 360.211 382.524 357.499 387.871 355.232L386.079 355.988C393.839 352.73 428.22 345.039 434.473 345.879L432.479 345.611C441.67 346.894 450.653 349.376 459.199 352.993L457.408 352.237C461.738 354.076 465.947 356.19 470.008 358.566C472.037 359.756 474.026 361.01 475.975 362.329C476.898 362.953 477.81 363.591 478.713 364.244C479.165 364.57 479.614 364.899 480.06 365.233C480.308 365.418 480.554 365.605 480.801 365.791C481.84 366.57 479.37 364.662 480.459 365.524C484.105 368.388 487.568 371.479 490.827 374.777C492.427 376.407 493.973 378.089 495.464 379.822C496.228 380.712 496.977 381.614 497.71 382.53C498.074 382.985 499.315 384.631 497.795 382.614C498.166 383.107 498.542 383.597 498.909 384.093C502.069 388.371 504.875 392.898 507.301 397.631C509.094 401.129 514.287 402.433 517.562 400.322C519.245 399.287 520.464 397.642 520.965 395.731C521.466 393.819 521.211 391.789 520.253 390.061Z"
                            fill="#565151"
                        />
                        <path
                            d="M432.863 512.456C432.088 512.491 431.322 512.288 430.667 511.873C430.012 511.459 429.501 510.853 429.202 510.138C428.903 509.423 428.831 508.633 428.996 507.876C429.16 507.119 429.554 506.43 430.123 505.904C430.218 505.526 430.287 505.253 430.382 504.875C430.348 504.792 430.314 504.71 430.279 504.627C426.799 496.33 404.594 519.461 403.634 527.259C403.211 530.706 403.39 534.201 404.161 537.587C396.969 521.897 393.234 504.844 393.21 487.584C393.208 483.253 393.449 478.925 393.931 474.621C394.329 471.092 394.881 467.589 395.587 464.11C399.442 445.237 407.719 427.547 419.739 412.494C426.613 412.877 432.637 411.83 433.218 398.508C433.322 396.139 435.08 394.087 435.467 391.752C434.811 391.838 434.144 391.892 433.487 391.935C433.283 391.946 433.068 391.957 432.864 391.968L432.786 391.971C432.065 392.003 431.35 391.826 430.727 391.462C430.104 391.097 429.599 390.56 429.275 389.916C428.95 389.271 428.818 388.546 428.895 387.828C428.973 387.11 429.256 386.43 429.711 385.87C429.994 385.521 430.278 385.173 430.561 384.824C430.992 384.286 431.433 383.759 431.863 383.221C431.913 383.17 431.959 383.116 432.003 383.06C432.498 382.447 432.993 381.844 433.488 381.231C432.584 379.829 431.369 378.655 429.937 377.799C424.978 374.895 418.136 376.906 414.553 381.392C410.96 385.878 410.283 392.172 411.531 397.777C412.758 402.546 414.788 407.072 417.533 411.16C417.264 411.504 416.985 411.837 416.716 412.182C411.799 418.504 407.514 425.292 403.922 432.45C404.939 424.511 392.511 395.842 387.704 389.769C381.931 382.475 370.093 385.658 369.076 394.905C369.067 394.994 369.057 395.084 369.047 395.173C369.761 395.576 370.46 396.004 371.144 396.456C372.003 397.03 372.668 397.85 373.053 398.808C373.438 399.767 373.525 400.819 373.301 401.828C373.078 402.836 372.555 403.754 371.801 404.46C371.047 405.166 370.098 405.629 369.077 405.786L368.972 405.802C359.416 419.446 390.05 454.957 397.717 446.984C394.108 457.211 391.845 467.865 390.983 478.676C390.495 485.055 390.524 491.462 391.069 497.836L391.037 497.61C389.333 483.728 360.105 463.088 351.57 464.807C346.654 465.797 341.811 465.572 342.557 470.532C342.569 470.611 342.581 470.69 342.594 470.769C343.919 471.309 345.208 471.93 346.456 472.63C347.17 473.033 347.868 473.461 348.552 473.913C349.411 474.487 350.077 475.307 350.462 476.265C350.847 477.224 350.933 478.276 350.71 479.285C350.486 480.293 349.963 481.211 349.209 481.917C348.456 482.624 347.506 483.086 346.485 483.243L346.38 483.259C346.305 483.27 346.241 483.281 346.165 483.292C341.816 498.258 374.073 522.412 393.683 514.726H393.694C395.637 523.171 398.453 531.391 402.096 539.254H432.11C432.218 538.921 432.315 538.576 432.412 538.243C429.633 538.418 426.844 538.251 424.106 537.748C426.333 535.016 428.56 532.262 430.787 529.529C430.837 529.478 430.884 529.424 430.927 529.368C432.057 527.969 433.197 526.581 434.327 525.183L434.327 525.181C434.387 520.894 433.895 516.618 432.863 512.456L432.863 512.456ZM398.492 444.843L398.508 444.821L398.492 444.864V444.843ZM391.844 504.775L391.585 504.194C391.596 503.775 391.596 503.355 391.585 502.925C391.585 502.806 391.564 502.688 391.564 502.57C391.661 503.312 391.747 504.054 391.854 504.797L391.844 504.775Z"
                            fill="#565151"
                        />
                        <path
                            d="M95.6145 450C101.69 450 106.615 445.075 106.615 439C106.615 432.925 101.69 428 95.6145 428C89.5394 428 84.6145 432.925 84.6145 439C84.6145 445.075 89.5394 450 95.6145 450Z"
                            fill="#565151"
                        />
                        <path
                            d="M227.615 570C233.69 570 238.615 565.075 238.615 559C238.615 552.925 233.69 548 227.615 548C221.539 548 216.615 552.925 216.615 559C216.615 565.075 221.539 570 227.615 570Z"
                            fill="#565151"
                        />
                        <path
                            d="M728.615 570C734.69 570 739.615 565.075 739.615 559C739.615 552.925 734.69 548 728.615 548C722.539 548 717.615 552.925 717.615 559C717.615 565.075 722.539 570 728.615 570Z"
                            fill="#565151"
                        />
                        <path
                            d="M755.615 430C761.69 430 766.615 425.075 766.615 419C766.615 412.925 761.69 408 755.615 408C749.539 408 744.615 412.925 744.615 419C744.615 425.075 749.539 430 755.615 430Z"
                            fill="#565151"
                        />
                        <path
                            d="M723.615 328C729.69 328 734.615 323.075 734.615 317C734.615 310.925 729.69 306 723.615 306C717.539 306 712.615 310.925 712.615 317C712.615 323.075 717.539 328 723.615 328Z"
                            fill="#565151"
                        />
                        <path
                            d="M264.615 419C264.608 421.81 263.521 424.509 261.58 426.54C259.638 428.571 256.99 429.778 254.183 429.911C251.376 430.044 248.626 429.092 246.501 427.254C244.376 425.415 243.04 422.83 242.768 420.034C242.496 417.237 243.31 414.443 245.041 412.23C246.771 410.016 249.287 408.553 252.067 408.143C254.846 407.732 257.677 408.406 259.974 410.025C262.271 411.644 263.857 414.084 264.405 416.84C264.546 417.551 264.616 418.275 264.615 419Z"
                            fill="#565151"
                        />
                        <path
                            d="M484.615 360C490.69 360 495.615 355.075 495.615 349C495.615 342.925 490.69 338 484.615 338C478.539 338 473.615 342.925 473.615 349C473.615 355.075 478.539 360 484.615 360Z"
                            fill="#565151"
                        />
                        <path
                            d="M375.615 349C375.608 351.81 374.521 354.509 372.58 356.54C370.638 358.571 367.99 359.778 365.183 359.911C362.376 360.044 359.626 359.092 357.501 357.254C355.377 355.415 354.04 352.83 353.768 350.034C353.496 347.237 354.31 344.443 356.041 342.23C357.771 340.016 360.287 338.553 363.067 338.143C365.846 337.732 368.678 338.406 370.974 340.025C373.271 341.644 374.857 344.084 375.405 346.84C375.546 347.551 375.616 348.275 375.615 349Z"
                            fill="#565151"
                        />
                        <path
                            d="M233.615 317C233.608 319.81 232.521 322.509 230.58 324.54C228.638 326.571 225.99 327.778 223.183 327.911C220.376 328.044 217.626 327.092 215.501 325.254C213.376 323.415 212.04 320.83 211.768 318.034C211.496 315.237 212.31 312.443 214.041 310.23C215.771 308.016 218.287 306.553 221.067 306.143C223.846 305.732 226.677 306.406 228.974 308.025C231.271 309.644 232.857 312.084 233.405 314.84C233.546 315.551 233.616 316.275 233.615 317Z"
                            fill="#565151"
                        />
                        <path
                            d="M599.615 454C605.69 454 610.615 449.075 610.615 443C610.615 436.925 605.69 432 599.615 432C593.539 432 588.615 436.925 588.615 443C588.615 449.075 593.539 454 599.615 454Z"
                            fill="#565151"
                        />
                        <path
                            d="M426.615 354C435.451 354 442.615 346.837 442.615 338C442.615 329.163 435.451 322 426.615 322C417.778 322 410.615 329.163 410.615 338C410.615 346.837 417.778 354 426.615 354Z"
                            fill="#565151"
                        />
                        <path
                            d="M859.306 570.841L1.5564 571.148C1.40003 571.148 1.2452 571.117 1.10074 571.057C0.956279 570.997 0.825027 570.91 0.714462 570.799C0.603897 570.689 0.516182 570.557 0.456345 570.413C0.396507 570.268 0.365723 570.114 0.365723 569.957C0.365723 569.801 0.396507 569.646 0.456345 569.502C0.516182 569.357 0.603897 569.226 0.714462 569.115C0.825027 569.005 0.956279 568.917 1.10074 568.857C1.2452 568.797 1.40003 568.767 1.5564 568.767L859.306 568.459C859.622 568.46 859.924 568.586 860.146 568.809C860.369 569.032 860.494 569.335 860.494 569.65C860.494 569.965 860.369 570.267 860.146 570.491C859.924 570.714 859.622 570.84 859.306 570.841Z"
                            fill="#CACACA"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_346_2397">
                            <rect width="860.131" height="571.148" fill="white" transform="translate(0.365723)" />
                        </clipPath>
                    </defs>
                </svg>
                <h2>
                    The page you're looking for <br/> <span>does not exist!</span>
                </h2>
                <Link className={classes.cta} to={"/"}>
                    <ArrowBackOutlinedIcon />
                    <p>Go back to Home</p>
                </Link>
            </div>
        </div>
    )
}

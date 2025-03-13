document.addEventListener('DOMContentLoaded', function() {
    // Function to initialize auto-scrolling for tables
    function initTableAutoScroll() {
        // Get the table element
        const tableEl = document.getElementById("behavior-benchmark-main-table");
        if (!tableEl) {
            console.log("Table element not found, retrying in 500ms");
            setTimeout(initTableAutoScroll, 500);
            return;
        }
        
        const tableWrapper = tableEl.querySelector(".tabulator-tableholder");
        if (!tableWrapper) {
            console.log("Table wrapper not found, retrying in 500ms");
            setTimeout(initTableAutoScroll, 500);
            return;
        }
        
        console.log("Auto-scroll initialized for table");
        
        // Variables for auto-scrolling
        let scrollAmount = 0;
        const scrollSpeed = 1; // Pixels per interval
        let scrollInterval;
        let scrollDirection = 1; // 1 for right, -1 for left
        let maxScroll;
        
        // Start auto-scrolling
        function startAutoScroll() {
            scrollInterval = setInterval(function() {
                maxScroll = tableWrapper.scrollWidth - tableWrapper.clientWidth;
                
                // Only scroll if there's content to scroll
                if (maxScroll <= 0) return;
                
                // Update scroll position
                scrollAmount += (scrollSpeed * scrollDirection);
                
                // Change direction when reaching the end
                if (scrollAmount >= maxScroll) {
                    scrollDirection = -1;
                } else if (scrollAmount <= 0) {
                    scrollDirection = 1;
                }
                
                // Apply scroll
                tableWrapper.scrollLeft = scrollAmount;
            }, 30); // Adjust interval for smoother/faster scrolling
        }
        
        // Pause scrolling when hovering
        tableWrapper.addEventListener("mouseenter", function() {
            clearInterval(scrollInterval);
        });
        
        // Resume scrolling when mouse leaves
        tableWrapper.addEventListener("mouseleave", function() {
            startAutoScroll();
        });
        
        // Start scrolling initially
        startAutoScroll();
    }
    
    // Function to create a horizontal scrolling video carousel
    function createVideoCarousel() {
        // 只选择带有 carousel-enabled 类的视频容器
        const videoContainer = document.querySelector(".video-container.carousel-enabled");
        if (!videoContainer) {
            console.log("Carousel-enabled video container not found");
            return;
        }
        
        // 获取现有表格
        const existingTable = videoContainer.querySelector("table");
        if (!existingTable) {
            console.log("Video table not found");
            return;
        }
        
        // 获取所有视频单元格
        const videoCells = existingTable.querySelectorAll("td");
        if (!videoCells.length) {
            console.log("No video cells found");
            return;
        }
        
        // 创建轮播容器 - 添加浅绿色透明背景和固定高度
        const carouselContainer = document.createElement("div");
        carouselContainer.className = "video-carousel-container";
        carouselContainer.style.width = "100%";
        carouselContainer.style.height = "500px"; // 增加容器高度以适应更大的视频
        carouselContainer.style.backgroundColor = "rgba(232, 245, 233, 0.6)"; // 浅绿色背景带透明度
        carouselContainer.style.overflow = "hidden"; // 隐藏溢出内容
        carouselContainer.style.position = "relative";
        carouselContainer.style.margin = "0 auto";
        carouselContainer.style.borderRadius = "8px"; // 圆角
        carouselContainer.style.padding = "20px";
        carouselContainer.style.boxSizing = "border-box";
        carouselContainer.style.border = "none"; // 确保没有边框
        carouselContainer.style.cursor = "grab"; // 显示抓取光标
        
        // 创建轮播轨道 - 为了实现连续滚动，我们需要复制视频
        const carouselTrack = document.createElement("div");
        carouselTrack.className = "video-carousel-track";
        carouselTrack.style.display = "flex";
        carouselTrack.style.position = "absolute";
        carouselTrack.style.left = "0";
        carouselTrack.style.top = "0";
        carouselTrack.style.height = "100%"; // 设置高度为100%
        carouselTrack.style.padding = "20px";
        carouselTrack.style.boxSizing = "border-box";
        carouselTrack.style.transition = "transform 0.3s ease"; // 添加平滑过渡效果
        
        // 创建视频项数组
        const videoItems = [];
        
        // 处理每个视频单元格
        videoCells.forEach((cell, index) => {
            // 创建视频项容器
            const videoItem = document.createElement("div");
            videoItem.className = "video-carousel-item";
            videoItem.style.display = "flex";
            videoItem.style.flexDirection = "column";
            videoItem.style.alignItems = "center";
            videoItem.style.justifyContent = "flex-start"; // 从顶部开始对齐内容
            videoItem.style.minWidth = "600px"; // 设置最小宽度
            videoItem.style.maxWidth = "600px"; // 设置最大宽度
            videoItem.style.height = "100%"; // 设置高度为100%
            videoItem.style.margin = "0 10px"; // 减小左右间距为10px
            videoItem.style.boxSizing = "border-box";
            videoItem.style.position = "relative";
            videoItem.style.overflow = "hidden"; // 隐藏溢出内容
            
            // 创建视频包装器，控制视频宽度和高度
            const videoWrapper = document.createElement("div");
            videoWrapper.className = "video-wrapper";
            videoWrapper.style.width = "100%";
            videoWrapper.style.maxWidth = "600px";
            videoWrapper.style.height = "350px"; // 增加视频容器高度到350px
            videoWrapper.style.margin = "0 auto";
            videoWrapper.style.position = "relative";
            videoWrapper.style.overflow = "hidden"; // 隐藏溢出内容
            
            // 获取视频元素
            const video = cell.querySelector("video");
            if (video) {
                // 克隆视频元素
                const clonedVideo = video.cloneNode(true);
                clonedVideo.style.width = "100%";
                clonedVideo.style.height = "100%"; // 设置高度为100%
                clonedVideo.style.objectFit = "cover"; // 确保视频填充容器
                clonedVideo.style.borderRadius = "8px"; // 视频圆角
                clonedVideo.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // 添加阴影
                
                // 将克隆的视频添加到视频包装器
                videoWrapper.appendChild(clonedVideo);
                
                // 获取折叠部分
                const collapsibleSection = cell.querySelector(".collapsible-section");
                if (collapsibleSection) {
                    // 克隆折叠部分
                    const clonedCollapsible = collapsibleSection.cloneNode(true);
                    
                    // 获取按钮和内容
                    const button = clonedCollapsible.querySelector("button");
                    const content = clonedCollapsible.querySelector(".collapse-content");
                    
                    if (button && content) {
                        // 设置按钮样式
                        button.style.width = "100%";
                        button.style.maxWidth = "600px";
                        button.style.margin = "10px auto 0";
                        button.style.borderRadius = "4px";
                        
                        // 设置内容样式
                        content.style.width = "100%";
                        content.style.maxWidth = "600px";
                        content.style.margin = "0 auto";
                        content.style.backgroundColor = "white";
                        content.style.padding = "15px";
                        content.style.borderRadius = "0 0 8px 8px";
                        content.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                        content.style.zIndex = "10";
                        content.style.position = "absolute"; // 使内容绝对定位
                        content.style.top = "390px"; // 调整位置以适应更大的视频高度
                        content.style.maxHeight = "300px"; // 限制内容最大高度
                        content.style.overflowY = "auto"; // 添加垂直滚动条
                        
                        // 添加点击事件
                        button.addEventListener("click", function() {
                            // 切换内容显示状态
                            if (content.style.display === "none" || !content.style.display) {
                                content.style.display = "block";
                                
                                // 更新图标
                                const icon = button.querySelector('.fas');
                                if (icon) {
                                    icon.classList.remove('fa-angle-down');
                                    icon.classList.add('fa-angle-up');
                                }
                                
                                // 暂停轮播
                                isPaused = true;
                                stopScroll();
                                carouselContainer.style.cursor = "default";
                                
                                console.log("Content opened, carousel paused");
                            } else {
                                content.style.display = "none";
                                
                                // 更新图标
                                const icon = button.querySelector('.fas');
                                if (icon) {
                                    icon.classList.remove('fa-angle-up');
                                    icon.classList.add('fa-angle-down');
                                }
                                
                                // 恢复轮播
                                isPaused = false;
                                carouselContainer.style.cursor = "grab";
                                startContinuousScroll();
                                
                                console.log("Content closed, carousel resumed");
                            }
                        });
                    }
                    
                    // 将克隆的折叠部分添加到视频项
                    videoItem.appendChild(clonedCollapsible);
                }
                
                // 将视频包装器添加到视频项
                videoItem.appendChild(videoWrapper);
                
                // 将视频项添加到数组
                videoItems.push(videoItem);
                
                // 将视频项添加到轮播轨道
                carouselTrack.appendChild(videoItem);
            }
        });
        
        // 计算轮播轨道的总宽度
        const trackWidth = videoItems.length * 620; // 每个视频项的宽度加上左右边距
        carouselTrack.style.width = `${trackWidth}px`;
        
        // 将轮播轨道添加到轮播容器
        carouselContainer.appendChild(carouselTrack);
        
        // 将轮播容器添加到页面
        videoContainer.innerHTML = '';
        videoContainer.appendChild(carouselContainer);
        
        // 初始化滚动位置和状态
        let scrollPosition = 0;
        let scrollInterval;
        let isDragging = false;
        let startX;
        let scrollLeft;
        let isPaused = false;
        
        // 函数：开始连续滚动
        function startContinuousScroll() {
            // 清除现有的滚动间隔
            clearInterval(scrollInterval);
            
            // 设置新的滚动间隔
            scrollInterval = setInterval(() => {
                scrollPosition += 1; // 每次滚动1像素
                
                // 如果滚动到了一半，重置位置
                if (scrollPosition >= trackWidth) {
                    scrollPosition = 0;
                }
                
                carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
            }, 20); // 每20毫秒滚动一次，可以调整速度
        }
        
        // 函数：停止滚动
        function stopScroll() {
            clearInterval(scrollInterval);
        }
        
        // 鼠标按下时开始拖动
        carouselContainer.addEventListener("mousedown", function(e) {
            if (isPaused) return; // 如果已暂停，不允许拖动
            
            isDragging = true;
            startX = e.pageX - carouselContainer.offsetLeft;
            scrollLeft = scrollPosition;
            carouselTrack.style.transition = 'none'; // 拖动时移除过渡效果
            carouselContainer.style.cursor = 'grabbing'; // 更改光标样式
            stopScroll(); // 停止自动滚动
            
            // 防止选中文本
            e.preventDefault();
        });
        
        // 鼠标移动时更新位置
        carouselContainer.addEventListener("mousemove", function(e) {
            if (!isDragging) return;
            
            const x = e.pageX - carouselContainer.offsetLeft;
            const walk = (x - startX) * 2; // 乘以2使拖动更敏感
            
            scrollPosition = scrollLeft - walk;
            
            // 确保滚动位置在有效范围内
            if (scrollPosition < 0) {
                scrollPosition = 0;
            } else if (scrollPosition > trackWidth) {
                scrollPosition = trackWidth;
            }
            
            carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
        });
        
        // 鼠标释放时结束拖动
        carouselContainer.addEventListener("mouseup", function() {
            if (!isDragging) return;
            
            isDragging = false;
            carouselTrack.style.transition = 'transform 0.3s ease'; // 恢复过渡效果
            carouselContainer.style.cursor = 'grab'; // 恢复光标样式
            
            if (!isPaused) {
                startContinuousScroll(); // 恢复自动滚动
            }
        });
        
        // 鼠标离开时结束拖动
        carouselContainer.addEventListener("mouseleave", function() {
            if (isDragging) {
                isDragging = false;
                carouselTrack.style.transition = 'transform 0.3s ease';
                carouselContainer.style.cursor = 'grab';
                
                if (!isPaused) {
                    startContinuousScroll();
                }
            }
        });
        
        // 点击轮播区域（非按钮和非折叠内容）时关闭所有折叠内容并恢复滚动
        carouselContainer.addEventListener("click", function(e) {
            // 检查点击的元素是否是按钮或折叠内容或其子元素
            let target = e.target;
            let isButtonOrContent = false;
            
            while (target && target !== carouselContainer) {
                if (target.tagName === 'BUTTON' || target.classList.contains('collapse-content')) {
                    isButtonOrContent = true;
                    break;
                }
                target = target.parentElement;
            }
            
            // 如果点击的不是按钮或折叠内容，关闭所有折叠内容并恢复滚动
            if (!isButtonOrContent && isPaused) {
                // 关闭所有折叠内容
                const contents = carouselContainer.querySelectorAll('.collapse-content');
                contents.forEach(content => {
                    content.style.display = 'none';
                });
                
                // 更新所有图标
                const buttons = carouselContainer.querySelectorAll('button');
                buttons.forEach(button => {
                    const icon = button.querySelector('.fas');
                    if (icon) {
                        icon.classList.remove('fa-angle-up');
                        icon.classList.add('fa-angle-down');
                    }
                });
                
                isPaused = false;
                carouselContainer.style.cursor = "grab";
                startContinuousScroll();
                console.log("Clicked outside content, carousel resumed");
            }
        });
        
        // 防止拖动过程中失去鼠标焦点
        document.addEventListener('mouseleave', function() {
            if (isDragging) {
                isDragging = false;
                carouselTrack.style.transition = 'transform 0.3s ease';
                carouselContainer.style.cursor = 'grab';
                if (!isPaused) {
                    startContinuousScroll();
                }
            }
        });
        
        // 鼠标悬停时暂停滚动
        carouselContainer.addEventListener("mouseenter", function() {
            if (!isPaused) {
                stopScroll();
            }
        });
        
        // 鼠标离开时恢复滚动
        carouselContainer.addEventListener("mouseleave", function() {
            if (!isDragging && !isPaused) {
                startContinuousScroll();
            }
        });
        
        // 启动连续滚动
        startContinuousScroll();
    }
    
    // Initialize both scrolling features
    setTimeout(function() {
        initTableAutoScroll();
        createVideoCarousel();
    }, 1500);
    
    // Also try to initialize when the tab becomes active
    document.getElementById('main-results-tab').addEventListener('shown.bs.tab', function() {
        setTimeout(initTableAutoScroll, 500);
    });
}); 
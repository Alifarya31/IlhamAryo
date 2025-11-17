// Custom Video Player Controls
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all video players
  const videoPlayers = document.querySelectorAll('.custom-video-player');

  videoPlayers.forEach(function(customVideoPlayer) {
    const videoPlayer = customVideoPlayer.querySelector('.video-player');

    if (!videoPlayer) return;

    const playPauseBtn = customVideoPlayer.querySelector('.play-pause-btn');
    const progressBar = customVideoPlayer.querySelector('.progress-bar');
    const progressFilled = customVideoPlayer.querySelector('.progress-filled');
    const currentTimeDisplay = customVideoPlayer.querySelector('.current-time');
    const durationDisplay = customVideoPlayer.querySelector('.duration');
    const volumeBtn = customVideoPlayer.querySelector('.volume-btn');
    const volumeSlider = customVideoPlayer.querySelector('.volume-slider');
    const fullscreenBtn = customVideoPlayer.querySelector('.fullscreen-btn');
    const videoControls = customVideoPlayer.querySelector('.video-controls');

  // Play/Pause Toggle
  function togglePlay() {
    if (videoPlayer.paused) {
      videoPlayer.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      videoPlayer.pause();
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }

  playPauseBtn.addEventListener('click', togglePlay);
  videoPlayer.addEventListener('click', togglePlay);

  // Update Progress Bar
  function updateProgress() {
    const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressFilled.style.width = `${percent}%`;

    // Update time display
    currentTimeDisplay.textContent = formatTime(videoPlayer.currentTime);
    durationDisplay.textContent = formatTime(videoPlayer.duration);
  }

  videoPlayer.addEventListener('timeupdate', updateProgress);

  // Format time (seconds to mm:ss)
  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Seek functionality
  function seek(e) {
    const progressBarWidth = progressBar.offsetWidth;
    const clickX = e.offsetX;
    const duration = videoPlayer.duration;

    videoPlayer.currentTime = (clickX / progressBarWidth) * duration;
  }

  progressBar.addEventListener('click', seek);

  // Volume Control
  function toggleMute() {
    if (videoPlayer.muted) {
      videoPlayer.muted = false;
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      volumeSlider.value = videoPlayer.volume * 100;
    } else {
      videoPlayer.muted = true;
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
      volumeSlider.value = 0;
    }
  }

  volumeBtn.addEventListener('click', toggleMute);

  volumeSlider.addEventListener('input', function() {
    const volume = this.value / 100;
    videoPlayer.volume = volume;
    videoPlayer.muted = false;

    if (volume === 0) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else if (volume < 0.5) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  });

  // Fullscreen Toggle
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (customVideoPlayer.requestFullscreen) {
        customVideoPlayer.requestFullscreen();
      } else if (customVideoPlayer.webkitRequestFullscreen) {
        customVideoPlayer.webkitRequestFullscreen();
      } else if (customVideoPlayer.msRequestFullscreen) {
        customVideoPlayer.msRequestFullscreen();
      }
      fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
  }

  fullscreenBtn.addEventListener('click', toggleFullscreen);

  // Update fullscreen button on fullscreen change
  document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
      fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    } else {
      fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    }
  });

  // Show/Hide controls on hover
  let controlsTimeout;

  customVideoPlayer.addEventListener('mouseenter', function() {
    videoControls.classList.add('show');
    clearTimeout(controlsTimeout);
  });

  customVideoPlayer.addEventListener('mouseleave', function() {
    controlsTimeout = setTimeout(function() {
      if (!videoPlayer.paused) {
        videoControls.classList.remove('show');
      }
    }, 2000);
  });

  customVideoPlayer.addEventListener('mousemove', function() {
    videoControls.classList.add('show');
    clearTimeout(controlsTimeout);

    if (!videoPlayer.paused) {
      controlsTimeout = setTimeout(function() {
        videoControls.classList.remove('show');
      }, 2000);
    }
  });

  // Always show controls when paused
  videoPlayer.addEventListener('pause', function() {
    videoControls.classList.add('show');
    clearTimeout(controlsTimeout);
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Only work if video is in viewport
    const rect = videoPlayer.getBoundingClientRect();
    const inViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (!inViewport) return;

    switch(e.key) {
      case ' ':
      case 'k':
        e.preventDefault();
        togglePlay();
        break;
      case 'm':
        e.preventDefault();
        toggleMute();
        break;
      case 'f':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        videoPlayer.currentTime -= 5;
        break;
      case 'ArrowRight':
        e.preventDefault();
        videoPlayer.currentTime += 5;
        break;
      case 'ArrowUp':
        e.preventDefault();
        videoPlayer.volume = Math.min(1, videoPlayer.volume + 0.1);
        volumeSlider.value = videoPlayer.volume * 100;
        break;
      case 'ArrowDown':
        e.preventDefault();
        videoPlayer.volume = Math.max(0, videoPlayer.volume - 0.1);
        volumeSlider.value = videoPlayer.volume * 100;
        break;
    }
  });

  // Load metadata to show duration
  videoPlayer.addEventListener('loadedmetadata', function() {
    durationDisplay.textContent = formatTime(videoPlayer.duration);
    console.log('Video loaded:', videoPlayer.id, 'Duration:', videoPlayer.duration);
  });

  // Reset play button when video ends
  videoPlayer.addEventListener('ended', function() {
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    videoControls.classList.add('show');
  });

  // Error handling
  videoPlayer.addEventListener('error', function(e) {
    console.error('Video error:', videoPlayer.id, e);
    console.error('Error code:', videoPlayer.error.code);
    console.error('Error message:', videoPlayer.error.message);

    // Show error message to user
    const errorMsg = document.createElement('div');
    errorMsg.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;text-align:center;padding:20px;background:rgba(0,0,0,0.8);border-radius:10px;';
    errorMsg.innerHTML = '<i class="fas fa-exclamation-triangle" style="font-size:40px;margin-bottom:10px;"></i><br>Video tidak dapat dimuat<br><small>Format video mungkin tidak didukung</small>';
    customVideoPlayer.appendChild(errorMsg);
  });

  // Can play event
  videoPlayer.addEventListener('canplay', function() {
    console.log('Video can play:', videoPlayer.id);
  });

  }); // End of forEach loop
});

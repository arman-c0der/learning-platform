'use client'
import ReactPlayer from 'react-player';
import { useState, useEffect } from 'react';

export const LessonVideo = ({ courseId, lesson, module }) => {
  const [hasWindow, setHasWindow] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  
  async function updateLessonWatch(state, lastTime = 0) {
    try {
      const response = await fetch("/api/lesson-watch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          lessonId: lesson.id,
          moduleSlug: module,
          state,
          lastTime,
        }),
      });
      if (!response.ok) {
        const result = await response.text();
        ("Failed to update lesson watch state", result);
      }
    } catch (err) {
      ("Error calling lesson-watch API", err);
    }
  }

  useEffect(() => {
    if (!started) return;
    updateLessonWatch("started", 0);
  }, [started]);

  useEffect(() => {
    if (!ended) return;
    updateLessonWatch("completed", duration);
  }, [ended]);

  function handleOnStart() {
    ('Video started');
    setStarted(true);
  }
  function handleOnDuration(d) {
    setDuration(d);
  }
  function handleOnProgress(progress) {
    ('Video progress:', progress);
  }
  function handleOnEnded() {
    ('Video ended');
    setEnded(true);
  }

  return (
    hasWindow && (
      <div className="w-full h-[400px]">
        <ReactPlayer
          src={lesson.video_url}
          width="100%"
          height="100%"
          controls={true}
          onStart={handleOnStart}
          onDuration={handleOnDuration}
          onProgress={handleOnProgress}
          onEnded={handleOnEnded}
        />
      </div>
    )
  );
};
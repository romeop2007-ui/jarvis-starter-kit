import { execFile } from "node:child_process";
import { promisify } from "node:util";
const execFileP = promisify(execFile);
const ffmpeg = (await import("ffmpeg-static")).default;
const V = "../../../livrables/ecommerce/creas/ressources créas avant modifs/T5/26706844792333984_video_0.mp4";
const times = [0,1.5,3,4.5,6,7.5,9,10.5,12,13.5,15,16.5,18,19];
for (const t of times) {
  await execFileP(ffmpeg, ["-hide_banner","-loglevel","error","-ss",String(t),"-i",V,"-frames:v","1","-q:v","3",`_travail/T5/AD1/frames/f_${t}.jpg`,"-y"]);
  console.log("frame", t);
}

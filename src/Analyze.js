import jsfeat from 'jsfeat'

let screen_corners = [];
let screen_descriptors;
let matches = [];

let pattern_corners;
let pattern_descriptors;


let img_u8 = new jsfeat.matrix_t(640, 480, jsfeat.U8_t | jsfeat.C1_t);
let img_u8_smooth = new jsfeat.matrix_t(640, 480, jsfeat.U8_t | jsfeat.C1_t);
screen_descriptors = new jsfeat.matrix_t(32, 500, jsfeat.U8_t | jsfeat.C1_t);


var match_t = (function () {
    function match_t(screen_idx, pattern_lev, pattern_idx, distance) {
        if (typeof screen_idx === "undefined") { screen_idx = 0; }
        if (typeof pattern_lev === "undefined") { pattern_lev = 0; }
        if (typeof pattern_idx === "undefined") { pattern_idx = 0; }
        if (typeof distance === "undefined") { distance = 0; }

        this.screen_idx = screen_idx;
        this.pattern_lev = pattern_lev;
        this.pattern_idx = pattern_idx;
        this.distance = distance;
    }
    return match_t;
})();

let i = 640 * 480;
while (--i >= 0) {
    screen_corners[i] = new jsfeat.keypoint_t(0, 0, 0, 0, -1);
    matches[i] = new match_t();
}


export function findMatches(width, height, cameraContext, cameraOverlayConext, imageContext) {
    // console.log("[INFO] finding matches...")

    let threshold = 20;
    let laplacian_threshold = 30
    let min_eigen_value_threshold = 25
    let blurRadius = 5
    let maxKeypoints = 500
    let drawKeypoints = true

    let num_matches = 0;
    let good_matches = 0;
    let count = 0;


    let cameraData = cameraContext.getImageData(0, 0, width, height);
    // let imageData = imageContext.getImageData(0, 0, width, height);


    jsfeat.fast_corners.set_threshold(threshold);
    jsfeat.imgproc.grayscale(cameraData.data, width, height, img_u8);
    jsfeat.imgproc.gaussian_blur(img_u8, img_u8_smooth, blurRadius);
    jsfeat.yape06.laplacian_threshold = laplacian_threshold;
    jsfeat.yape06.min_eigen_value_threshold = min_eigen_value_threshold;

    count = detect_keypoints(img_u8_smooth, screen_corners, maxKeypoints);
    jsfeat.orb.describe(img_u8_smooth, screen_corners, count, screen_descriptors);


    // // console.log("[INFO] number of keypoints detected in video:", count)
    if (drawKeypoints) {
        var data_u32 = new Uint32Array(cameraData.data.buffer);
        render_corners(screen_corners, count, data_u32, width);
        cameraOverlayConext.putImageData(cameraData, 0, 0);
    }

    if (pattern_descriptors && screen_descriptors) {
        // console.log("Length", pattern_descriptors.length)
        // good_matches = find_transform(matches, num_matches);
        num_matches = match_pattern(screen_descriptors, pattern_descriptors, matches);
        // console.log("[INFO] number of matches:", num_matches)
    }
    return { count, num_matches }

}



export function train() {
    pattern_corners = [];
    pattern_descriptors = [];
    pattern_descriptors = [JSON.parse(JSON.stringify(screen_descriptors))]

};

function match_pattern(screen_descriptors, pattern_descriptors, matches) {

    var q_cnt = screen_descriptors.rows;
    var query_du8 = screen_descriptors.data;
    var query_u32 = screen_descriptors.buffer.i32; // cast to integer buffer
    var qd_off = 0;
    var qidx = 0, lev = 0, pidx = 0, k = 0;
    var num_matches = 0;
    var num_train_levels = 4;

    for (qidx = 0; qidx < q_cnt; ++qidx) {
        var best_dist = 256;
        var best_dist2 = 256;
        var best_idx = -1;
        var best_lev = -1;

        for (lev = 0; lev < 1; ++lev) {
            var lev_descr = pattern_descriptors[lev];
            // console.log(pattern_descriptors, pattern_descriptors[lev])
            var ld_cnt = lev_descr.rows;
            var ld_i32 = lev_descr.buffer.i32; // cast to integer buffer
            var ld_off = 0;

            for (pidx = 0; pidx < ld_cnt; ++pidx) {

                var curr_d = 0;
                // our descriptor is 32 bytes so we have 8 Integers
                for (k = 0; k < 8; ++k) {
                    curr_d += popcnt32(query_u32[qd_off + k] ^ ld_i32[ld_off + k]);
                }

                if (curr_d < best_dist) {
                    best_dist2 = best_dist;
                    best_dist = curr_d;
                    best_lev = lev;
                    best_idx = pidx;
                } else if (curr_d < best_dist2) {
                    best_dist2 = curr_d;
                }

                ld_off += 8; // next descriptor
            }
        }

        // filter out by some threshold
        var match_threshold = 48;
        if (best_dist < match_threshold) {
            matches[num_matches].screen_idx = qidx;
            matches[num_matches].pattern_lev = best_lev;
            matches[num_matches].pattern_idx = best_idx;
            num_matches++;
        }
        //

        /* filter using the ratio between 2 closest matches
        if(best_dist < 0.8*best_dist2) {
            matches[num_matches].screen_idx = qidx;
            matches[num_matches].pattern_lev = best_lev;
            matches[num_matches].pattern_idx = best_idx;
            num_matches++;
        }
        */

        qd_off += 8; // next query descriptor
    }

    return num_matches;
}




function render_corners(corners, count, img, step) {
    var pix = (0xff << 24) | (0x00 << 16) | (0xff << 8) | 0x00;
    for (var i = 0; i < count; ++i) {
        var x = corners[i].x;
        var y = corners[i].y;
        var off = (x + y * step);
        img[off] = pix;
        img[off - 1] = pix;
        img[off + 1] = pix;
        img[off - step] = pix;
        img[off + step] = pix;
    }

}

function render_matches(ctx, matches, count) {

    for (var i = 0; i < count; ++i) {
        var m = matches[i];
        var s_kp = screen_corners[m.screen_idx];
        var p_kp = pattern_corners[m.pattern_lev][m.pattern_idx];
        ctx.beginPath();
        ctx.moveTo(s_kp.x, s_kp.y);
        ctx.lineTo(p_kp.x * 0.5, p_kp.y * 0.5); // our preview is downscaled
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

function detect_keypoints(img, corners, max_allowed) {
    // detect features
    var count = jsfeat.yape06.detect(img, corners, 17);

    // sort by score and reduce the count if needed
    if (count > max_allowed) {
        jsfeat.math.qsort(corners, 0, count - 1, function (a, b) { return (b.score < a.score); });
        count = max_allowed;
    }

    // calculate dominant orientation for each keypoint
    for (var i = 0; i < count; ++i) {
        corners[i].angle = ic_angle(img, corners[i].x, corners[i].y);
    }

    return count;
}

// central difference using image moments to find dominant orientation
function ic_angle(img, px, py) {
    var u_max = new Int32Array([15, 15, 15, 15, 14, 14, 14, 13, 13, 12, 11, 10, 9, 8, 6, 3, 0]);
    var half_k = 15; // half patch size
    var m_01 = 0, m_10 = 0;
    var src = img.data, step = img.cols;
    var u = 0, v = 0, center_off = (py * step + px) | 0;
    var v_sum = 0, d = 0, val_plus = 0, val_minus = 0;

    // Treat the center line differently, v=0
    for (u = -half_k; u <= half_k; ++u)
        m_10 += u * src[center_off + u];

    // Go line by line in the circular patch
    for (v = 1; v <= half_k; ++v) {
        // Proceed over the two lines
        v_sum = 0;
        d = u_max[v];
        for (u = -d; u <= d; ++u) {
            val_plus = src[center_off + u + v * step];
            val_minus = src[center_off + u - v * step];
            v_sum += (val_plus - val_minus);
            m_10 += u * (val_plus + val_minus);
        }
        m_01 += v * v_sum;
    }

    return Math.atan2(m_01, m_10);
}

// non zero bits count
function popcnt32(n) {
    n -= ((n >> 1) & 0x55555555);
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
    return (((n + (n >> 4)) & 0xF0F0F0F) * 0x1010101) >> 24;
}




const linkHtml = (text) => `<span style="color:rgb(29, 155, 240)">${text}</span>`;
const imageHtml = (url) => `<img class="tweetImage" src=${url} alt="" srcset="">`;
const videoHtml = (url) =>
  `<div class="attachmentsContainer">
    <img class="tweetImage" src=${url} alt="" srcset="">
      <div class="playIcon">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="18" fill="#FFFEFF"/>
              <circle cx="18" cy="18" r="14" fill="#4A99E9"/>
              <path d="M14 11V25.5L26 18L14 11Z" fill="white"/>
          </svg>
      </div>
    </div>`;

const editNameText = (text) => {
  if (text.length > 15) {
    return `${text.slice(0, 13)}...`;
  } else return text;
};

const editCounts = (count) => {
  if (count < 1000) return count;
  const shortCount = count / 1000;
  if (count < 10000) return shortCount;

  const parsedCount = parseFloat(shortCount).toFixed(1);

  if (parsedCount.endsWith('0')) {
    return `${Math.floor(parsedCount)}B`.replace('.', ',');
  } else return `${parsedCount}B`.replace('.', ',');
};

{
  /* <a id="${data.id}" href="${data.id}" target="_blank"> */
}
const contentHtml = (data) => `
<a href="${data.id}" target="_blank">

  <div class="contentContainer">
    <div>
    ${
      data.isRetweet
        ? `<div class="retweetIcon"> <svg class="svg-icon" style="width: 1.2rem; height: 1.2rem;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M256 245.333333L437.333333 426.666667H298.666667v256h277.333333l85.333333 85.333333H298.666667a85.333333 85.333333 0 0 1-85.333334-85.333333v-256H74.666667L256 245.333333m512 533.333334L586.666667 597.333333H725.333333V341.333333h-277.333333l-85.333333-85.333333H725.333333a85.333333 85.333333 0 0 1 85.333334 85.333333v256h138.666666L768 778.666667z" fill="" /></svg> </div> `
        : ''
    }
        <img class="${
          data.verified_type == 'business'
            ? 'profileImageBusiness'
            : data.verified_type == 'blue'
            ? 'profileImageUser'
            : ''
        }" src="${data.profile_image_url}">
    </div>
      <div class="textContainer">
          ${data.isRetweet ? `<div class="retweetText">BAYKAR yeniden gönderi yayınladı</div>` : ''}
          <div class="headerContainer">
              <div class="headerTextContainer">
                  <div class="headerTextNameContainer">
                      <div class="brandName">${editNameText(data.name)}</div>
                      <img style="width:1rem" src="${
                        data.verified_type == 'business'
                          ? 'https://cdn.baykartech.com/static/assets/twitter/verified.svg'
                          : data.verified_type == 'blue'
                          ? 'https://cdn.baykartech.com/static/assets/twitter/verifiedBlue.svg'
                          : ''
                      }">
                  </div>
                  <div class="hedaerInfoTextArea">
                    <div class="nickname">${data.userName}</div>
                    <div id="headerDot"></div>
                    <div>
                        <p class="dateText">${data.date}</p>
                    </div>
                  </div>
              </div>
              <div>
                  <div class="xIcon">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                          <g>
                              <path
                                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                              </path>
                          </g>
                      </svg>
                  </div>
              </div>
          </div>
          <div class="tweetContent">
            <div class="tweetTextArea">
                <p>${data.text}</p>
            </div>
            <div>
                ${data.attachmentsHtml}
            </div>
            ${!!data.quotedHtml ? ` <div>${data.quotedHtml}</div>` : ''}
            <div class="metricsContainer">
                <div class="answers">
                    <div class="answersIcon">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                                <path
                                    d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z">
                                </path>
                            </g>
                        </svg>
                    </div>
                    <span>
                        ${data.answersCount}
                    </span>
                </div>
                <div class="favorites">
                    <div class="answersIcon">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                                <path
                                    d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z">
                                </path>
                            </g>
                        </svg>
                    </div>
                    <span>
                        ${data.favCounts}
                    </span>
                </div>
            </div>
          </div>
          
      </div>
      
  </div>
  <div class="tweetContentMobile">
            <div class="tweetTextArea">
                <p>${data.text}</p>
            </div>
            <div>
                ${data.attachmentsHtml}
            </div>
            ${!!data.quotedHtml ? ` <div>${data.quotedHtml}</div>` : ''}
            <div class="metricsContainer">
                <div class="answers">
                    <div class="answersIcon">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                                <path
                                    d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z">
                                </path>
                            </g>
                        </svg>
                    </div>
                    <span>
                        ${data.answersCount}
                    </span>
                </div>
                <div class="favorites">
                    <div class="answersIcon">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                                <path
                                    d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z">
                                </path>
                            </g>
                        </svg>
                    </div>
                    <span>
                        ${data.favCounts}
                    </span>
                </div>
            </div>
          </div>
</a>
    `;

const quotedHtml = (data) => `
<div class="quotedContainer">
<div>
    <img class="quotedPofileImage" src="${data.profile_image_url}">
</div>
<div class="textContainer">
    <div class="quotedHeaderContainer">
        <div class="quotedHeaderTextContainer">
            <div class="headerTextNameContainer">
                <div class="brandName">${editNameText(data.name)}</div>
                <img style="width:1rem" src='https://cdn.baykartech.com/static/assets/twitter/verified.svg'>
            </div>
            <div class="nickname">${data.userName}</div>
            <div id="headerDot"></div>
            <div>
                <p class="dateText">${data.date}</p>
            </div>
        </div>
    </div>
    <div class="tweetTextArea">
        <p>${data.text}</p>
    </div>
    <div>
        ${data.attachmentsHtml}
    </div>
</div>
</div>
`;
const galleryWithTwoImage = (imageElements) => `
<div class="attachmentsContainer">
    <div class="gallery2">
     ${imageElements.join(' ')}
    </div>
</div>`;
const galleryWithThreeImage = (imageElements) => `
<div class="attachmentsContainer">
    <div class="gallery3">
     ${imageElements.join(' ')}
    </div>
</div>`;
const galleryWithFourImage = (imageElements) => `
<div class="attachmentsContainer">
    <div class="gallery4">
     ${imageElements.join(' ')}
    </div>
</div>`;
const timeline = document.getElementsByClassName('tweetContainer')[0];

const attachmentsAreaRender = (attachments) => {
  if (attachments.length == 0) {
    return '';
  }
  switch (attachments.length) {
    case 1:
      const attachment = attachments[0];
      if (attachment.type == 'video') {
        return videoHtml(attachment.url);
      } else if (attachment.type == 'photo') {
        return imageHtml(attachment.url);
      }
      break;
    case 2:
      return galleryWithTwoImage(
        attachments.map((item) => {
          if (item.type == 'video') {
            return videoHtml(item.url);
          } else if (item.type == 'photo') {
            return imageHtml(item.url);
          }
        })
      );
    case 3:
      return galleryWithThreeImage(
        attachments.map((item) => {
          if (item.type == 'video') {
            return `${videoHtml(item.url)}`;
          } else if (item.type == 'photo') {
            return imageHtml(item.url);
          }
        })
      );

    case 4:
      return galleryWithFourImage(
        attachments.map((item) => {
          if (item.type == 'video') {
            return videoHtml(item.url);
          } else if (item.type == 'photo') {
            return imageHtml(item.url);
          }
        })
      );
      break;
    default:
      break;
  }
  /*   mediaKeys.forEach((mediaKeyItem, index) => {
    const attachments = data[1].media.find((k) => k.media_key == mediaKeyItem);

    if (attachments.type == 'video') {
      return videoHtml(attachments.url);
    } else if (attachments.type == 'photo') {
      return imageHtml(attachments.url);
    }
  }); */
};

function renderTweet(data) {
  const tweetList = data.map((item, itemIndex) => {
    var renderedText = item.tweet_type.type == 'retweeted' ? item.tweet_type.text : item.text;
    const textWithSpace = renderedText.replaceAll('\n', '<br/> ');

    const helperArray = textWithSpace.split(' ');

    const newArray = [];
    helperArray.forEach((wordItem) => (wordItem.includes('https://t.co') ? '' : newArray.push(wordItem)));

    helperArray.forEach((element, index) => {
      if (element[0] == '#' || element[0] == '@') {
        newArray.splice(index, 1, linkHtml(element));
      }
    });

    const text = newArray.join(' ');

    const attachmentsKeys = !!item.attachments ? item.attachments.media_keys : 'null';
    //console.log(attachmentsKeys);

    const date = `${new Date(item.created_at).getDate()} ${new Date(item.created_at).toLocaleString('default', {
      month: 'short',
    })}`;

    if (item.tweet_type.type == 'retweeted') {
      const retweetItem = item.tweet_type;

      return contentHtml({
        id: !!retweetItem.url ? `${retweetItem.url}` : 'https://twitter.com/BaykartTech',
        name: retweetItem.user.name,
        userName: `@${retweetItem.user.username}Bayraktar`,
        profile_image_url: retweetItem.user.profile_image_url,
        date: `${date}`,
        text: text,
        isRetweet: true,
        verified_type: retweetItem.user.verified_type,
        attachmentsHtml: attachmentsAreaRender(retweetItem.attachments),
        answersCount: `${editCounts(retweetItem.public_metrics.reply_count)}`,
        favCounts: `${editCounts(retweetItem.public_metrics.like_count)}`,
      });
    }

    if (item.tweet_type.type == 'quoted') {
      const quotedItem = item.tweet_type;

      return contentHtml({
        id: !!item.url ? `${item.url}` : 'https://twitter.com/BaykartTech',
        name: item.user.name,
        userName: `@${item.user.username}`,
        profile_image_url: item.user.profile_image_url,
        date: `${date}`,
        text: text,
        attachmentsHtml: attachmentsAreaRender(item.attachments),
        answersCount: `${editCounts(item.public_metrics.reply_count)}`,
        verified_type: item.user.verified_type,
        favCounts: `${editCounts(item.public_metrics.like_count)}`,
        quotedHtml: quotedHtml({
          id: !!quotedItem.url ? `${quotedItem.url}` : 'https://twitter.com/BaykartTech',
          name: quotedItem.user.name,
          userName: `@${quotedItem.user.username}`,
          profile_image_url: quotedItem.user.profile_image_url,
          date: `${date}`,
          text: text,
          attachmentsHtml: attachmentsAreaRender(quotedItem.attachments),
          answersCount: `${editCounts(quotedItem.public_metrics.reply_count)}`,
          favCounts: `${editCounts(quotedItem.public_metrics.like_count)}`,
        }),
      });
    }

    return contentHtml({
      id: !!item.url ? `${item.url}` : 'https://twitter.com/BaykartTech',
      name: item.user.name,
      userName: `@${item.user.username}`,
      profile_image_url: item.user.profile_image_url,
      date: `${date}`,
      text: text,
      verified_type: item.user.verified_type,
      attachmentsHtml: attachmentsAreaRender(item.attachments),
      answersCount: `${editCounts(item.public_metrics.reply_count)}`,
      favCounts: `${editCounts(item.public_metrics.like_count)}`,
    });
  });

  timeline.innerHTML = tweetList.join('');
}

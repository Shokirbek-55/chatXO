/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const PHOTO_SIZE = 320;
export const PHOTO_THUMBNAIL_SIZE = 90;

let webpSupported: any | undefined = undefined;

export async function isWebpSupported() {
    // return false;

    if (webpSupported !== undefined) {
        return webpSupported;
    }

    const promise = new Promise<any>(resolve => {
        const image = new Image();
        image.onload = function () {
            resolve(image.width === 2 && image.height === 1);
        };
        image.onerror = function () {
            resolve(false);
        };
        image.src =
            'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==';
    });

    return (webpSupported = await promise);
}

export function itemsInView(scrollContainerRef, itemsContainerRef) {
    const scrollContainer = scrollContainerRef.current;
    const itemsContainer = itemsContainerRef ? itemsContainerRef.current : scrollContainer;

    const items: any[] = [];
    for (let i = 0; i < itemsContainer.children.length; i++) {
        const child = itemsContainer.children[i];
        if (
            child.offsetTop + child.offsetHeight >= scrollContainer.scrollTop &&
            child.offsetTop <= scrollContainer.scrollTop + scrollContainer.offsetHeight
        ) {
            items.push(i);
        }
    }

    return items;
}

export function mapEquals(map1, map2) {
    if (!map1 || !map2) return false;

    let testVal;
    if (map1.size !== map2.size) {
        return false;
    }

    for (let [key, val] of map1) {
        testVal = map2.get(key);
        // in cases of an undefined value, make sure the key
        // actually exists on the object so there are no false positives
        if (testVal !== val || (testVal === undefined && !map2.has(key))) {
            return false;
        }
    }
    return true;
}

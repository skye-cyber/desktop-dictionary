export type EventMap = {
    'panel:settings:open': []
    "panel:settings:close": []
    'theme:change': [isDark: boolean]
    'bookmark:change': []
    'search:query:update': [query: string]
    'perform:search': []
};


export type EventCallback<T extends keyof EventMap> = (...args: EventMap[T]) => void;
export type EventSubscription = { unsubscribe: () => void };

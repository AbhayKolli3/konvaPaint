import Konva from 'konva'

export default class KonvaShapeFactory {
    static Rect(config: Konva.RectConfig) {
        return new Konva.Rect({...config, perfectDrawEnabled: false})
    }

    static Circle(config: Konva.CircleConfig) {
        return new Konva.Circle({...config, perfectDrawEnabled: false})
    }

    static Line(config: Konva.LineConfig) {
        return new Konva.Line({...config, perfectDrawEnabled: false})
    }

    static Path(config: Konva.PathConfig) {
        return new Konva.Path({...config, perfectDrawEnabled: false})
    }

    static Text(config: Konva.TextConfig) {
        return new Konva.Text({...config, perfectDrawEnabled: false})
    }
}